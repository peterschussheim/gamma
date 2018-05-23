/* @flow */
const debug = require('debug')('api')
const uuid = require('node-uuid')
debug('Server starting...')
debug('logging with debug enabled!')
import compression from 'compression'
import express from 'express'
import { ApolloServer, gql, ForbiddenError } from 'apollo-server'
import { registerServer } from 'apollo-server-express'
import 'express-async-errors'
import { generateSchema } from './utils/generateSchema'

import Raven from './shared/raven'
import { init as initPassport } from './api/authentication'
import middlewares from './api/routes/middlewares'
import securityMiddleware from './shared/middlewares/security'
import authRoutes from './api/routes/auth'
import apiRoutes from './api/routes/api'

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000
initPassport()

const app = express()
app.set('trust proxy', true)
securityMiddleware(app)
app.use(compression())
app.use(middlewares)
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

// $FlowIssue
app.use(
  (
    err: Error,
    req: express$Request,
    res: express$Response,
    next: express$NextFunction
  ) => {
    if (err) {
      console.error(err)
      res
        .status(500)
        .send(
          'Oops, something went wrong! Our engineers have been alerted and will fix this asap.'
        )
      Raven.captureException(err)
    } else {
      return next()
    }
  }
)

var faker = require('faker')
var randomName = faker.name.findName()
var randomEmail = faker.internet.email()
var randomCard = faker.helpers.createCard()
const mocks = {}
const typeDefs = gql`
  type Query {
    hello: String
  }
`
const resolvers = {
  Query: {
    hello: () => `Hello ${faker.name.findName()}!`
  }
}

// const context = ({ req }) => {
//   const user = myAuthenticationLookupCode(req)
//   if (!user) {
//     throw new ForbiddenError(
//       'You need to be authenticated to access this schema!'
//     )
//   }

//   const scope = lookupScopeForUser(user)

//   return { user, scope }
// }

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
    engine: {
      origins: [{ requestTimeout: '80s' }]
    }
  })
  registerServer({ app, server })

  server
    .listen({ PORT, engine: true, apiKey: process.env.APOLLO_ENGINE_API_KEY })
    .then(({ url }) => {
      debug(`🚀 Server ready at ${url}`)
    })
}

process.on('unhandledRejection', async err => {
  console.error('Unhandled rejection', err)
  try {
    await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    console.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

process.on('uncaughtException', async err => {
  console.error('Uncaught exception', err)
  try {
    await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    console.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

export default startServer

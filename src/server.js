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
import { typeDefs } from './utils/generateSchema'
import mergedResolvers from './resolvers/index'
import Raven from './shared/raven'
import { init as initPassport } from './api/authentication'
import middlewares from './api/routes/middlewares'
import securityMiddleware from './shared/middlewares/security'
import authRoutes from './api/routes/auth'
import apiRoutes from './api/routes/api'

import { getUserIdFromReq } from './utils/getUserIdFromReq'

import { GitHubConnector } from './api/github/connector'
import { Repositories } from './api/github/models'

import type { DBUser, Loader } from './flowTypes'

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000
const {
  GITHUB_CLIENT_ID_DEVELOPMENT,
  GITHUB_CLIENT_SECRET_DEVELOPMENT
} = process.env

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

// app.use('/', (req: express$Request, res: express$Response) => {
//   res.redirect(
//     process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
//       ? 'https://gamma.app'
//       : 'http://localhost:4000'
//   )
// })

export type GraphQLContext = {
  user: DBUser,
  loaders: {
    [key: string]: Loader
  }
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: mergedResolvers,
    context: ({ req }) => ({
      ...req,
      user: () => {
        let user
        if (req.user) {
          user = {
            login: req.user.username,
            html_url: req.user.profileUrl,
            avatar_url: req.user.photos[0].value
          }
        }
        return user
      },
      Repositories: new Repositories({
        connector: new GitHubConnector({
          clientId: GITHUB_CLIENT_ID_DEVELOPMENT,
          clientSecret: GITHUB_CLIENT_SECRET_DEVELOPMENT
        })
      }),
      tracing: true,
      cacheControl: true
    })
  })
  registerServer({ app, server })
  server
    .listen({
      PORT,
      engine: true,
      apiKey: process.env.ENGINE_API_KEY,
      logging: {
        // Only show warnings and errors, not info messages.
        level: 'WARN'
      }
    })
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

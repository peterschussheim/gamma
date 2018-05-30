const debug = require('debug')('api')
const uuid = require('node-uuid')
debug('Server starting...')
debug('logging with debug enabled!')
import compression from 'compression'
import express from 'express'

import Raven from './shared/raven'
import { init as initPassport } from './api/authentication'
import middlewares from './api/routes/middlewares'
import securityMiddleware from './shared/middlewares/security'
import authRoutes from './api/routes/auth'
import apiRoutes from './api/routes/api'

import { GraphQLServer, PubSub } from 'graphql-yoga'
import { ApolloEngine } from 'apollo-engine'

const PORT = parseInt(process.env.PORT, 10) || 4000
const {
  ENGINE_API_KEY,
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
// app.use('/api', apiRoutes)

app.use((err, req, res, next) => {
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
})

const pubsub = new PubSub()

async function startServer() {
  const graphQLServer = new GraphQLServer({
    typeDefs,
    resolvers: mergedResolvers,
    context: { pubsub }
  })

  const engine = new ApolloEngine({
    apiKey: process.env.ENGINE_API_KEY
  })

  const httpServer = graphQLServer.createHttpServer({
    tracing: true,
    cacheControl: true
  })

  engine.listen({ port: PORT, httpServer }, () =>
    debug(`Server with Apollo Engine running on http://localhost:${PORT}`)
  )
}

// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers: mergedResolvers,
//     context: ({ req }) => ({
//       ...req,
//       user: () => {
//         let user
//         if (req.user) {
//           user = {
//             login: req.user.username,
//             html_url: req.user.profileUrl,
//             avatar_url: req.user.photos[0].value
//           }
//         }
//         return user
//       },
//       tracing: true,
//       cacheControl: true
//     })
//   })
//   registerServer({ app, server })
//   server
//     .listen({
//       PORT,
//       engine: true,
//       apiKey: process.env.ENGINE_API_KEY,
//       logging: {
//         // Only show warnings and errors, not info messages.
//         level: 'WARN'
//       }
//     })
//     .then(({ url }) => {
//       debug(`🚀 Server ready at ${url}`)
//     })
// }

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

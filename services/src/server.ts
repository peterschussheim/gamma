const debug = require('debug')('api')
debug('Server starting...')
debug('logging with debug enabled!')
import * as compression from 'compression'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { ApolloEngine } from 'apollo-engine'

import { Prisma } from './generated/prisma'
import { resolvers, fragmentReplacements } from './resolvers'
import Raven from './shared/raven'
import { redisInstance } from './redis'
import middlewares from './routes/middlewares'
import { securityMiddleware } from './shared/middlewares/security'

const PORT = parseInt(process.env.PORT, 10) || 4000

const pubsub = new PubSub()

async function startServer() {
  const db = new Prisma({
    fragmentReplacements,
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
  })

  const fakeContext = req => ({
    ...req,
    db,
    pubsub,
    redisInstance,
    session: req.request.session,
    req: req.request
  })
  const context = req => ({
    db,
    pubsub,
    redisInstance,
    session: req.request.session,
    req: req.request
  })
  debug(`FAKECONTEXT: ${JSON.stringify(fakeContext)}`)
  const graphQLServer = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context
  })

  graphQLServer.express.set('trust proxy', true)
  securityMiddleware(graphQLServer.express)
  graphQLServer.express.use(compression())
  graphQLServer.express.use(middlewares)
  graphQLServer.express.use((err, req, res, next) => {
    if (err) {
      debug.error(err)
      res
        .status(500)
        .send(
          'Something went wrong! Our engineers have been alerted and will fix this asap.'
        )
      Raven.captureException(err)
    } else {
      return next()
    }
  })

  /**
   * Options for graphql application server (graphQLServer)
   */
  const options = {
    port: PORT,
    cors: {
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
          ? ['https://gamma.app', /gamma-(\w|-)+\.now\.sh/g, /gamma\.app/]
          : [/localhost/]
    },
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground'
  }

  if (process.env.ENGINE_API_KEY) {
    const engine = new ApolloEngine({
      apiKey: process.env.ENGINE_API_KEY
    })
    const optionsWithTracing = {
      tracing: true,
      cacheControl: true,
      ...options
    }
    const httpServer = graphQLServer.createHttpServer(optionsWithTracing)
    engine.listen(
      { port: PORT, httpServer, graphqlPaths: ['/graphql', '/subscriptions'] },
      () =>
        debug(`Server with Apollo Engine running on http://localhost:${PORT}`)
    )
  } else {
    graphQLServer.start(options, ({ port }) =>
      debug(`Server running on http://localhost:${port}`)
    )
  }
}

process.on('unhandledRejection', async err => {
  debug('Unhandled rejection', err)
  try {
    await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    debug('Raven error', err)
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export default startServer

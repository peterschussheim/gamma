const debug = require('debug')('api')
debug('Server starting...')
debug('logging with debug enabled!')
import * as compression from 'compression'
import { GraphQLServer, PubSub, Options } from 'graphql-yoga'

import Raven from './shared/raven'
import { Prisma } from './generated/prisma'
import { resolvers, fragmentReplacements } from './resolvers'
import { redis } from './redis'
import middlewares from './routes/middlewares'
import { securityMiddleware } from './shared/middlewares/security'
import { PrismaBindingOptions } from './gamma'
const pubsub = new PubSub()

export default function startServer(prismaOptions: PrismaBindingOptions) {
  const db = new Prisma({
    fragmentReplacements,
    endpoint: prismaOptions.PRISMA_ENDPOINT,
    secret: prismaOptions.PRISMA_SECRET,
    debug: prismaOptions.PRISMA_DEBUG ? true : false
  })

  const context = ({ request }) => ({
    request,
    db,
    url: request.protocol + '://' + request.get('host'),
    pubsub,
    redis
  })

  const graphQLServer = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context,
    resolverValidationOptions: { requireResolversForResolveType: false }
  })

  graphQLServer.express.set('trust proxy', true)
  securityMiddleware(graphQLServer.express)
  graphQLServer.express.use(compression())
  graphQLServer.express.use(middlewares)

  graphQLServer.express.use((err, req, res, next) => {
    if (err) {
      debug(err)
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

  return graphQLServer
}

// if (process.env.ENGINE_API_KEY && !process.env.TEST) {
//   const engine = new ApolloEngine({
//     apiKey: process.env.ENGINE_API_KEY
//   })
//   const optionsWithTracing = {
//     tracing: true,
//     cacheControl: true,
//     ...options
//   }
//   const httpServer = graphQLServer.createHttpServer(optionsWithTracing)
//   engine.listen(
//     {
//       port: options.PORT,
//       httpServer,
//       graphqlPaths: ['/graphql', '/subscriptions', 'playground']
//     },
//     () =>
//       debug(`Application server with Apollo Engine running on http://localhost:${PORT}
// Application GraphQL server available on http://localhost:${PORT}${
//         options.endpoint
//       }
// Playground available on http://localhost:${PORT}${options.playground}
// Subscriptions available on ws://localhost:${PORT}${options.subscriptions}`)
//   )
// }

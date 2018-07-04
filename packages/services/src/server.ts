const debug = require('debug')('api')
debug('Server starting...')
debug('logging with debug enabled!')
import * as compression from 'compression'
import { GraphQLServer, PubSub } from 'graphql-yoga'

import { Prisma } from './generated/prisma'
import { resolvers, fragmentReplacements } from './resolvers'
import { redis } from './redis'
import middlewares from './middlewares'
import { securityMiddleware } from './middlewares/security'
import { PrismaBindingOptions } from './gamma'
import confirmEmail from './controllers/confirmEmail'
const pubsub = new PubSub()

const getPrismaInstance = (options: PrismaBindingOptions) => {
  return new Prisma({
    fragmentReplacements,
    endpoint: options.PRISMA_ENDPOINT,
    secret: options.PRISMA_SECRET,
    debug: options.PRISMA_DEBUG ? true : false
  })
}

export default function startServer(prismaOptions: PrismaBindingOptions) {
  const context = ({ request, response }) => ({
    req: request,
    res: response,
    db: getPrismaInstance(prismaOptions),
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
  graphQLServer.express.get('/', (req, res) => {
    res.send('greetings')
  })

  // TODO: add post route for s3 uploads
  graphQLServer.express.get(
    '/confirm/:id',
    confirmEmail({ prisma: getPrismaInstance(prismaOptions), redis })
  )

  return graphQLServer
}

// graphQLServer.express.use((err, req, res, next) => {
//   debug('test')
//   if (err) {
//     debug(err)
//     res
//       .status(500)
//       .send(
//         'Something went wrong! Our engineers have been alerted and will fix this asap.'
//       )
//     Raven.captureException(err)
//   } else {
//     return next()
//   }
// })
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

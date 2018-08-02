const debug = require('debug')('api')
debug('Server starting...')
debug('logging with debug enabled!')
import * as compression from 'compression'
import { GraphQLServer, PubSub } from 'graphql-yoga'

import { resolvers } from './resolvers'
import { redis } from './redis'
import middlewares from './middlewares'
import { securityMiddleware } from './middlewares/security'
import confirmEmail from './controllers/confirmEmail'
import { init as initPassport } from './initAuth'
import authRoutes from './routes/auth'
import getUser from './middlewares/getUser'

export default function startServer(databaseInstance) {
  const pubsub = new PubSub()
  const context = ({ request, response }) => ({
    req: request,
    res: response,
    db: databaseInstance,
    pubsub,
    redis
  })

  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context,
    resolverValidationOptions: { requireResolversForResolveType: false }
  })

  initPassport(databaseInstance)
  // TODO: add something to handle is server is too busy
  server.express.set('trust proxy', true)
  securityMiddleware(server.express)
  server.express.use(compression())
  server.express.use(middlewares)
  server.express.use('/auth', authRoutes)
  server.express.post(server.options.endpoint, (req, res, next) =>
    getUser(req, res, next, databaseInstance)
  )

  // server.express.use('/', (req, res) => {
  //   res.redirect(
  //     process.env.NODE_ENV === 'production'
  //       ? 'https://gamma.app'
  //       : 'http://localhost:3000'
  //   )
  // })

  server.express.get(
    '/confirm/:id',
    confirmEmail({ prisma: databaseInstance, redis })
  )
  // TODO: add post route for s3 uploads

  return server
}

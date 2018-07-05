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
// import {init as initPassport} from './github/githubLogin'

// initPassport()

// investigate using redis instead
// https://github.com/jfperrin/accounts-react/blob/master/server/src/redis.js
const pubsub = new PubSub()

export default function startServer(databaseInstance) {
  const context = ({ request, response }) => ({
    req: request,
    res: response,
    db: databaseInstance,
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

  // graphQLServer.express.set('trust proxy', true)
  securityMiddleware(graphQLServer.express)
  graphQLServer.express.use(compression())
  graphQLServer.express.use(middlewares)
  graphQLServer.express.get('/', (req, res) => {
    res.send('greetings')
  })

  // TODO: add post route for s3 uploads
  graphQLServer.express.get(
    '/confirm/:id',
    confirmEmail({ prisma: databaseInstance, redis })
  )

  return graphQLServer
}

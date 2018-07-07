const debug = require('debug')('api')
debug('Server starting...')
debug('logging with debug enabled!')
import * as compression from 'compression'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import * as passport from 'passport'

import { resolvers } from './resolvers'
import { redis } from './redis'
import middlewares from './middlewares'
import { securityMiddleware } from './middlewares/security'
import confirmEmail from './controllers/confirmEmail'
import { init as initPassport } from './github/githubLogin'

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
  server.express.use('/', (req, res) => {
    res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://gamma.app'
        : 'http://localhost:3000'
    )
  })
  server.express.get(
    '/login/github',
    passport.authenticate('github', { scope: ['user'] }) // TODO: make dynamic
  )

  server.express.get(
    '/login/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
  )

  server.express.get('/logout', (req, res) => {
    req.logout()
    // TODO: Need to update code for clearing all user sessions and
    // clearing one session
    res.redirect('/')
  })

  server.express.get(
    '/confirm/:id',
    confirmEmail({ prisma: databaseInstance, redis })
  )
  // TODO: add post route for s3 uploads

  return server
}

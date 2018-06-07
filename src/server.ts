const debug = require('debug')('api')
debug('Server starting...')
debug('logging with debug enabled!')
import * as compression from 'compression'
import * as passport from 'passport'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { Strategy } from 'passport-github2'
import { ApolloEngine } from 'apollo-engine'

import { Prisma } from './generated/prisma'
import { resolvers, fragmentReplacements } from './resolvers'
import Raven from './shared/raven'
import { redisInstance } from './api/redis'
import middlewares from './api/routes/middlewares'
import { securityMiddleware } from './shared/middlewares/security'
import authRoutes from './api/routes/auth'
import apiRoutes from './api/routes/api'

const PORT = parseInt(process.env.PORT, 10) || 4000

const pubsub = new PubSub()

async function startServer() {
  const db = new Prisma({
    fragmentReplacements,
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: true
  })
  passport.use(
    new Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
        scope: ['user']
      },
      async (accessToken, _, profile, cb) => {
        debug(profile)
        const { id, emails, name } = profile

        const query = db.query.user({ where: { id } })

        let email: string | null = null
        if (emails) {
          email = emails[0].value
          await db.query.user({ where: { email } })
        }
        let user = await query

        // user does not exist in db, need to register them
        if (!user) {
          // user = await db.mutation.createUser({
          //   data: {
          //     firstName: name.givenName,
          //     lastName: name.familyName,
          //     email,
          //     password: 123
          //   }
          // })
        }

        return cb(null, { id: user.id })
      }
    )
  )

  const graphQLServer = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
      ...req,
      db,
      pubsub,
      redisInstance,
      session: req.request.session,
      req: req.request
    })
  })

  graphQLServer.express.set('trust proxy', true)
  securityMiddleware(graphQLServer.express)
  graphQLServer.express.use(compression())
  graphQLServer.express.use(middlewares)

  // work on auth route next
  graphQLServer.express.use('/auth', authRoutes)
  // graphQLServer.express.get(
  //   '/auth/github',
  //   passport.authenticate('github', { scope: ['user:email'] }),
  //   function(req, res) {
  //     // The request will be redirected to GitHub for authentication, so this
  //     // function will not be called.
  //   }
  // )

  // // GET /auth/github/callback
  // //   Use passport.authenticate() as route middleware to authenticate the
  // //   request.  If authentication fails, the user will be redirected back to the
  // //   login page.  Otherwise, the primary route function will be called,
  // //   which, in this example, will redirect the user to the home page.
  // graphQLServer.express.get(
  //   '/auth/github/callback',
  //   passport.authenticate('github', { failureRedirect: '/login' }),
  //   (req, res) => res.redirect('/')
  // )

  // graphQLServer.express.get('/logout', function(req, res) {
  //   req.logout()
  //   res.redirect('/')
  // })
  graphQLServer.express.use('/api', apiRoutes)

  graphQLServer.express.use((err, req, res, next) => {
    if (err) {
      debug.error(err)
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

  if (process.env.ENGINE_API_KEY) {
    const engine = new ApolloEngine({
      apiKey: process.env.ENGINE_API_KEY
    })
    const httpServer = graphQLServer.createHttpServer({
      tracing: true,
      cacheControl: true
    })
    engine.listen({ port: PORT, httpServer, graphqlPaths: ['/'] }, () =>
      debug(`Server with Apollo Engine running on http://localhost:${PORT}`)
    )
  } else {
    graphQLServer.start({ port: PORT }, () =>
      debug(`Server running on http://localhost:${PORT}`)
    )
  }
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export default startServer

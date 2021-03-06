const debug = require('debug')('entrypoint')
require('now-env')
const util = require('util')
import { formatError } from 'apollo-errors'
import { Options } from 'graphql-yoga'
import startServer from './server'
import { defaultPrismaOptions, initDatabase } from './db'

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || 'localhost'
const NODE_ENV = process.env.NODE_ENV || 'development'

const options: Options = {
  port: PORT,
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
        ? [
            'https://gamma.app',
            /\.gamma\.app$/,
            /(\.|https:\/\/)now\.sh$/
          ].filter(Boolean)
        : [/localhost/, /github\.com/],
    preflightContinue: true
  },
  endpoint: '/api',
  subscriptions: {
    path: '/subscriptions',
    onDisconnect: rawSocket => {
      const userId = rawSocket.upgradeReq.session
    },
    onConnect: (connectionParams, rawSocket, context) => {
      const userId = rawSocket.upgradeReq.session
      return userId
    }
  },
  playground:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? false
      : '/playground',
  formatError,
  bodyParserOptions: {
    type: '*/*'
  }
}

/**
 * Instantiate an instance of our prisma db using desired env variables
 */
const prisma = initDatabase(defaultPrismaOptions)

startServer(prisma)
  .start(options)
  .then(http => {
    debug(`NODE_ENV: ${NODE_ENV}`)
    debug(`Server running on http://localhost:${PORT}`)
    debug(`GraphQL uri http://localhost:${PORT}${options.endpoint}`)
    debug(`Subscriptions uri ws://${HOST}:${PORT}/subscriptions`)
  })
  .catch(err => {
    debug(`ERROR CAUGHT index.ts: ${err}`)
    process.exit(1)
  })

// process.on('unhandledRejection', async err => {
//   debug('Unhandled rejection', err)
//   try {
//     await new Promise(resolve => Raven.captureException(err, resolve))
//   } catch (err) {
//     debug('Raven error', err)
//   } finally {
//     process.exit(1)
//   }
// })

// process.on('uncaughtException', async err => {
//   console.error('Uncaught exception', err)
//   try {
//     await new Promise(resolve => Raven.captureException(err, resolve))
//   } catch (err) {
//     console.error('Raven error', err)
//   } finally {
//     process.exit(1)
//   }
// })

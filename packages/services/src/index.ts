const debug = require('debug')('entrypoint')
import { formatError } from 'apollo-errors'
import { AddressInfo } from 'net'
import { Options } from 'graphql-yoga'

import { defaultPrismaOptions, initDatabase } from './db'
import startServer from './server'
import Raven from './shared/raven'

const PORT = parseInt(process.env.PORT, 10) || 4000

// TODO: https://github.com/apollographql/subscriptions-transport-ws#constructorurl-options-websocketimpl
const options: Options = {
  port: PORT,
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
        ? [
            'https://gamma.app',
            /gamma-(\w|-)+\.now\.sh/g,
            /gamma\.app/,
            /services-(\w|-)+\.now\.sh/g,
            // REMOVE ASAP
            /localhost/
          ]
        : [/localhost/],
    preflightContinue: true
  },
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: process.env.NODE_ENV === 'production' ? false : '/playground',
  formatError
}

/**
 * Instantiate an instance of our prisma db using desired env variables
 */
const prisma = initDatabase(defaultPrismaOptions)

/**
 *  Paths needed to handle:
 *
 * 1) start server with apollo engine (currently disabled.)
 * 2) start server without apollo engine
 *
 */

startServer(prisma)
  .start(options)
  .then(http => {
    const { port } = http.address() as AddressInfo
    debug(`Server running on http://localhost:${port}`)
    debug(`GraphQL endpoint http://localhost:${port}${options.endpoint}`)
    debug(
      `API Server over web socket with subscriptions is now running on ws://localhost:${port}${
        options.subscriptions
      }`
    )
  })
  .catch(err => {
    debug(`ERROR CAUGHT index.ts: ${err}`)
    process.exit(1)
  })

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

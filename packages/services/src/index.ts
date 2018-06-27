const debug = require('debug')('entrypoint')
import { formatError } from 'apollo-errors'
import { AddressInfo } from 'net'
import { Options } from 'graphql-yoga'

import startServer from './server'
import Raven from './shared/raven'

const PORT = parseInt(process.env.PORT, 10) || 4000
const { PRISMA_ENDPOINT, PRISMA_SECRET } = process.env

const prismaOptions = {
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  PRISMA_DEBUG: false
}

// TODO: https://github.com/apollographql/subscriptions-transport-ws#constructorurl-options-websocketimpl
const options: Options = {
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
  playground: '/playground',
  formatError
}

/**
 *  Paths needed to handle:
 *
 * 1) start server with apollo engine (currently disabled.)
 * 2) start server without apollo engine
 *
 */
startServer(prismaOptions)
  .start(options)
  .then(http => {
    const { port } = http.address() as AddressInfo
    debug(`Server running on http://localhost:${port}`)
    debug(`GraphQL URI: http://localhost:${port}${options.endpoint}`)
    debug(`Playground URI: http://localhost:${port}${options.playground}`)
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

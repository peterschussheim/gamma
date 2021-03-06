const logger = require('debug')('api:redis')
import * as Redis from 'ioredis'

logger(`Connecting to Redis instance at: ${process.env.REDISLABS_URI}`)

/**
 * Use in ApolloServer and pass into server's context object.
 */
export const redis = new Redis(
  `redis://:${process.env.REDISLABS_PW}@${process.env.REDISLABS_URI}`
)

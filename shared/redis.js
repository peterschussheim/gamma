import node_redis from 'redis'
import Redis from 'ioredis'
require('dotenv').config()

const logger = require('debug')('api:redis')

logger(`Connecting to Redis instance at: ${process.env.REDISLABS_URI}`)

/**
 * Use in ApolloServer and pass into server's context object.
 */
export const redisInstance = node_redis.createClient(
  `redis://:${process.env.REDISLABS_PW}@${process.env.REDISLABS_URI}`
)

// export const redis = new Redis(
//   `redis://:${process.env.REDISLABS_PW}@${process.env.REDISLABS_URI}`
// )

const logger = require('debug')('api:redis')
import redis from 'redis'

logger(`Connecting to Redis instance at: ${process.env.REDISLABS_URI}`)

/**
 * Use in ApolloServer and pass into server's context object.
 */
export const redisInstance = redis.createClient(
  `redis://:${process.env.REDISLABS_PW}@${process.env.REDISLABS_URI}`
)

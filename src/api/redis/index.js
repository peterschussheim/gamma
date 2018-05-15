const logger = require('debug')('api:redis')
import Redis from 'ioredis'

logger(`Connecting to Redis instance at: ${process.env.REDISLABS_URI}`)
export const redis = new Redis(
  `redis://:${process.env.REDISLABS_PW}@${process.env.REDISLABS_URI}`
)

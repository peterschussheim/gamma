import Redis from 'ioredis'
require('now-env')

const logger = require('debug')('shared:redis')
logger(`Connecting to Redis instance at: ${process.env.REDISLABS_URI}`)

export const redis = new Redis(
  `redis://:${process.env.REDISLABS_PW}@${process.env.REDISLABS_URI}`
)

export const REDIS_SESSION_PREFIX = 'sess:'
export const USER_SESSION_ID_PREFIX = 'usid:'
export const FORGOT_PW_PREFIX = 'forgotpw:'
export const HIT_COUNTER_PREFIX = 'htcount:'

/**
 * redis prefixes to be used when running tests, same as production prefixes
 * except we prefix with a `t`.
 */
export const REDIS_SESSION_PREFIX_TEST = 'tsess:'
export const USER_SESSION_ID_PREFIX_TEST = 'tusid:'
export const FORGOT_PW_PREFIX_TEST = 'tforgotpw:'
export const HIT_COUNTER_PREFIX_TEST = 'thcount:'

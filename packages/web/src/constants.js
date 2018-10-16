import { runtimeConfig } from './isomorphicVariables'

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

/**
 * The following exports are used to construct new apollo-client instances
 * on each request.
 */

export const IS_PROD =
  process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
export const API_URI = IS_PROD ? `/api` : 'http://localhost:4000/api'

const { STAGING, STAGING_WS_URI } = runtimeConfig

export const WS_URI =
  IS_PROD && STAGING
    ? `wss://${new URL(STAGING_WS_URI).hostname}/subscriptions`
    : !STAGING && !IS_PROD
      ? 'ws://localhost:4000/subscriptions'
      : `wss://${window.location.host}/subscriptions`

console.log(`IS_PROD: ${IS_PROD}`)
console.log(`STAGING: ${STAGING}`)
console.log(`WS_URI: ${WS_URI}`)

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
export const CLIENT_URL = IS_PROD
  ? `${window.location.protocol}//${window.location.host}`
  : 'http://localhost:3000'
export const API_URI = IS_PROD ? `/api` : 'http://localhost:4000/api'

const IS_STAGING = process.env.API_STAGING_URL != null

const STAGING_API_HOSTNAME = IS_STAGING
  ? new URL(process.env.API_STAGING_URL).hostname
  : null
export const WS_URI =
  IS_PROD && !IS_STAGING
    ? `wss://${window.location.host}/subscriptions`
    : IS_STAGING
      ? `wss://${STAGING_API_HOSTNAME}/subscriptions`
      : 'ws://localhost:4000/subscriptions'

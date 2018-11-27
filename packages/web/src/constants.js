import { runtimeConfig } from './isomorphicVariables'

export const REDIS_SESSION_PREFIX = 'sess:'
export const USER_SESSION_ID_PREFIX = 'usid:'
export const FORGOT_PW_PREFIX = 'forgotpw:'
export const HIT_COUNTER_PREFIX = 'htcount:'

/**
 * The following exports are used to construct new apollo-client instances
 * on each request.
 */

export const IS_PROD =
  process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV

const { STAGING, API_STAGING_URL } = runtimeConfig

export const API_URI =
  STAGING === 'true' && IS_PROD
    ? `https://${new URL(API_STAGING_URL).hostname}/api`
    : STAGING === 'false'
    ? `https://${window.location.host}/api`
    : 'http://localhost:4000/api'

export const WS_URI =
  STAGING === 'true' && IS_PROD
    ? `wss://${new URL(API_STAGING_URL).hostname}/subscriptions`
    : STAGING === 'false'
    ? `wss://${window.location.host}/subscriptions`
    : 'ws://localhost:4000/subscriptions'

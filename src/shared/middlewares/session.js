/* @flow */
// import { cookieKeygrip } from '../cookieUtils'
const debug = require('debug')('shared/middlewares:session')
debug('Initializing connect-redis session store')
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redis } from '../../api/redis'

const RedisStore = connectRedis(session)
const ONE_YEAR = 31556952000

if (!process.env.SESSION_COOKIE_SECRET && !process.env.TEST_DB) {
  throw new Error(
    '[shared/middlewares/session] You have to provide the SESSION_COOKIE_SECRET environment variable.'
  )
}

// TODO: fix expiration issue, currently expiration date is set to 24 hours.
export default session({
  store: new RedisStore({
    client: redis
  }),
  name: 'session',
  secret: process.env.SESSION_COOKIE_SECRET,
  resave: false,
  secure: process.env.NODE_ENV === 'production',
  maxAge: ONE_YEAR,
  saveUninitialized: true
})

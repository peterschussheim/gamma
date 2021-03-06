const debug = require('debug')('middlewares:session')
debug('Initializing connect-redis session store')
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import { redis } from '../redis'
import { REDIS_SESSION_PREFIX } from '../constants'
const RedisStore = connectRedis(session)

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    '[middlewares:session] You have to provide the SESSION_SECRET environment variable.'
  )
}

export default session({
  store: new RedisStore({
    client: redis as any,
    prefix: REDIS_SESSION_PREFIX
  }),
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false, // connect-redis implements 'touch' command, rendering 'resave' option unnecessary
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
})

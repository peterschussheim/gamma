import session from 'express-session'
import connectRedis from 'connect-redis'
import { redisInstance } from './redis'
import { REDIS_SESSION_PREFIX } from './constants'
const debug = require('debug')('middlewares:session')
debug('Initializing connect-redis session store')
const RedisStore = connectRedis(session)

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    '[middlewares:session] You have to provide the SESSION_SECRET environment variable.'
  )
}

export default session({
  store: new RedisStore({
    client: redisInstance,
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

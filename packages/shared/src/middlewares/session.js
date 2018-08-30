const debug = require('debug')('shared:middlewares:session')
debug('Initializing connect-redis session store')
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redisInstance, REDIS_SESSION_PREFIX } from '../redis'

const RedisStore = connectRedis(session)

if (!process.env.SESSION_SECRET) {
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

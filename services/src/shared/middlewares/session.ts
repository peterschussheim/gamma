// import { cookieKeygrip } from '../cookieUtils'
const debug = require('debug')('shared:middlewares:session')
debug('Initializing connect-redis session store')
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import { redisInstance } from '../../api/redis'

const RedisStore = connectRedis(session)

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    '[shared/middlewares/session] You have to provide the SESSION_SECRET environment variable.'
  )
}

export default session({
  store: new RedisStore({
    client: redisInstance
  }),
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false, // connect-redis implements 'touch' command, rendering 'resave' option unnecessary
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
})

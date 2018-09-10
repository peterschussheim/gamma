const debug = require('debug')('api:routes:middlewares')
import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import * as passport from 'passport'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import views from './views'
import useragent from './useragent'
import cors from './cors'
import session from './session'

const middlewares = Router()

if (process.env.NODE_ENV === 'development' && !process.env.test) {
  const raven = require('./raven').default
  middlewares.use(raven)
}

if (
  process.env.NODE_ENV === 'production' &&
  !process.env.FORCE_DEV &&
  !process.env.test
) {
  const raven = require('./raven').default
  middlewares.use(raven)
}

/**
 * Middleware that inspects request headers for an 'Authorization Bearer' header
 * containing a JWT.  If found, decode and verify the token.  If successful,
 * this will contain the `userId` which is attached to `req.headers`.
 *
 * If the above fails, move on to next middleware in the stack.
 */
middlewares.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.replace(/^\s*Bearer\s*/, '')
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
        userId: string
      }
      if (userId) {
        req.headers.cookie = userId
      }
    } catch (err) {}
  }
  next()
})

middlewares.use(cors)
middlewares.options('*', cors)
middlewares.use(cookieParser(process.env.SESSION_SECRET))
middlewares.use(bodyParser.urlencoded({ extended: true }))
middlewares.use(session)
middlewares.use(passport.initialize())
middlewares.use(passport.session())
middlewares.use(useragent)
middlewares.use(views)

debug('connect-redis successfully loaded')

export default middlewares

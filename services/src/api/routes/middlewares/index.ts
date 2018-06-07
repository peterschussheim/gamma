const debug = require('debug')('api:routes:middlewares')
import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'

import cors from '../../../shared/middlewares/cors'
import session from '../../../shared/middlewares/session'

const middlewares = Router()

if (process.env.NODE_ENV === 'development') {
  const raven = require('../../../shared/middlewares/raven').default
  middlewares.use(raven)
  const logging = require('../../../shared/middlewares/logging')
  middlewares.use(logging)
}

if (process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV) {
  // Raven (Sentry client) needs to come before everything else
  const raven = require('../../../shared/middlewares/raven').default
  middlewares.use(raven)
}

middlewares.use((req, res, next) => {
  if (req.headers && !req.headers.cookie && req.headers.authorization) {
    const token = req.headers.authorization.replace(/^\s*Bearer\s*/, '')
    try {
      const decoded = jwt.verify(token, process.env.API_TOKEN_SECRET)
      // if (decoded.cookie) req.headers.cookie = decoded.cookie
    } catch (err) {
      debug(`ERROR: ${err}`)
    }
  }
  next()
})

// Cross origin request support
middlewares.use(cors)
middlewares.options('*', cors)

middlewares.use(cookieParser())

middlewares.use(session)
debug('connect-redis successfully loaded!')
middlewares.use(passport.initialize())
middlewares.use(passport.session())

export default middlewares

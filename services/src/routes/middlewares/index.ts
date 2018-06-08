const debug = require('debug')('api:routes:middlewares')
import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import * as cookieParser from 'cookie-parser'

import cors from '../../shared/middlewares/cors'
import session from '../../shared/middlewares/session'

const middlewares = Router()

if (process.env.NODE_ENV === 'development') {
  const raven = require('../../shared/middlewares/raven').default
  middlewares.use(raven)
  const logging = require('../../shared/middlewares/logging')
  middlewares.use(logging)
}

if (process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV) {
  const raven = require('../../../shared/middlewares/raven').default
  middlewares.use(raven)
}

// middlewares.use(cors)
// middlewares.options('*', cors)
middlewares.use(cookieParser())
middlewares.use(session)
debug('connect-redis successfully loaded')

export default middlewares

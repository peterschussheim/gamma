const debug = require('debug')('api:routes:middlewares')
import { Router } from 'express'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'

import views from './views'
import useragent from './useragent'
import cors from './cors'
import session from './session'

const middlewares = Router()

if (process.env.NODE_ENV === 'development' && !process.env.test) {
  const raven = require('./raven').default
  middlewares.use(raven)
  const logging = require('./logging')
  middlewares.use(logging)
}

if (
  process.env.NODE_ENV === 'production' &&
  !process.env.FORCE_DEV &&
  !process.env.test
) {
  const raven = require('./raven').default
  middlewares.use(raven)
}

middlewares.use(morgan('dev'))
middlewares.use(cors)
middlewares.options('*', cors)
middlewares.use(cookieParser())
middlewares.use(session)
middlewares.use(useragent)
middlewares.use(views)

debug('connect-redis successfully loaded')

export default middlewares

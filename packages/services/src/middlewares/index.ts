const debug = require('debug')('api:routes:middlewares')
import { Router } from 'express'
import * as morgan from 'morgan'

import views from './views'
import useragent from './useragent'
import cors from './cors'
import session from './session'
import auth from './auth'

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
// WHY is `express-session` reporting 'no SID sent' when a user is logged into
// react app?
middlewares.use(session)
middlewares.use(auth)
middlewares.use(useragent)
middlewares.use(views)

debug('connect-redis successfully loaded')

export default middlewares

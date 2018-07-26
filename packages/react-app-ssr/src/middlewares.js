const debug = require('debug')('ssr:middlewares')
import { Router } from 'express'
import morgan from 'morgan'
// import jwt from 'jsonwebtoken'
// import * as passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from './session'

const corsInstance = cors({
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'https://gamma.app',
          /gamma-(\w|-)\.app/g,
          /gamma\.app/,
          /api-(\w|-)+\.gamma\.app/g
        ]
      : [/localhost/, /github\.com/],
  preflightContinue: true
})

const middlewares = Router()

middlewares.use(morgan('dev'))
middlewares.use(corsInstance)
middlewares.options('*', corsInstance)
middlewares.use(cookieParser(process.env.SESSION_SECRET))
middlewares.use(bodyParser.urlencoded({ extended: true }))
middlewares.use(session)

export default middlewares

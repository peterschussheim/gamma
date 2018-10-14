/* eslint-disable import/first */
const debug = require('debug')('web:renderer:index')
debug('Renderer starting...')
import 'raf/polyfill'
import fs from 'fs'
import express from 'express'
import Loadable from 'react-loadable'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
// import { Prisma } from '../../api/src/generated/prisma'
// console.log(path.resolve(__dirname, '..', '..', 'api/src/generated'))
// const Prisma = require.resolve(__dirname, '..', '..', 'api/src/generated')
import Raven from 'shared/src/raven'
import toobusy from 'shared/src/middlewares/toobusy'
import { securityMiddleware } from 'shared/src/middlewares/securityMiddleware'
import cors from 'shared/src/middlewares/cors'
import session from '../middlewares/session'
import renderer from './renderer'

// Cache is disabled for now
// import cache from './cache'
// app.use(cache)

// const { PRISMA_ENDPOINT, PRISMA_SECRET, PRISMA_DEBUG } = process.env
// const prismaOptions = {
//   PRISMA_ENDPOINT,
//   PRISMA_SECRET,
//   PRISMA_DEBUG
// }

/**
 * Returns a newly constructed `Prisma` instance which can access
 * the underlying database as needed.
 */
// const prisma = new Prisma({
//   endpoint: prismaOptions.PRISMA_ENDPOINT,
//   secret: prismaOptions.PRISMA_SECRET,
//   debug: Boolean(PRISMA_DEBUG)
// })

// const getUser = async id => {
//   return prisma.query.user({ where: { id } }, info)
// }

// const PORT = process.env.PORT || 3001

const app = express()
app.use(express.static(process.env.GAMMA_PUBLIC_DIR))
app.set('trust proxy', true)
app.use(toobusy)
securityMiddleware(app)

if (process.env.NODE_ENV === 'development') {
  const logging = require('shared/src/middlewares/logging')
  app.use(logging)
}

// if (process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV) {
//   const raven = require('shared/src/index').default
//   app.use(raven)
// }
app.use(cors)
app.options('*', cors)

// Redirect requests to /api and /auth to the production API
// This allows deploy previews to work, as this route would only be called
// if there's no path alias in Now for ui.gamma.app/api, which would only
// happen on deploy previews
app.use('/api', (req, res) => {
  const redirectUrl = `${req.baseUrl}${req.path}`
  res.redirect(
    req.method === 'POST' || req.xhr ? 307 : 301,
    process.env.API_STAGING_URL !== null
      ? `${process.env.API_STAGING_URL}${redirectUrl}`
      : `https://gamma.app${redirectUrl}`
  )
})

// app.use('/auth', (req, res) => {
//   const redirectUrl = `${req.baseUrl}${req.path}`
//   res.redirect(
//     req.method === 'POST' || req.xhr ? 307 : 301,
//     `https://gamma.app${redirectUrl}`
//   )
// })

app.use('/subscriptions', (req, res) => {
  const redirectUrl = `${req.baseUrl}${req.path}`
  debug(`subscriptions endpoint hit, redirecting to: ${redirectUrl}`)
  debug(`API_STAGING_URL: ${process.env.API_STAGING_URL}`)
  res.redirect(
    101,
    process.env.API_STAGING_URL !== null
      ? `${process.env.API_STAGING_URL}${redirectUrl}`
      : `https://gamma.app${redirectUrl}`
  )
})

if (process.env.NODE_ENV === 'development') {
  app.use('/sockjs-node', (req, res) => {
    res.redirect(301, `http://localhost:3000${req.path}`)
  })
}

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(bodyParser.json())
app.use(session)

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   getUser({ id })
//     .then(user => {
//       done(null, user)
//     })
//     .catch(err => {
//       done(err)
//     })
// })
// app.use(passport.initialize())
// app.use(passport.session())

// Static files
// This route handles the case where our ServiceWorker requests main.asdf123.js, but
// we've deployed a new version of the app so the filename changed to main.dfyt975.js
let jsFiles
try {
  jsFiles = fs.readdirSync(
    path.resolve(__dirname, '..', 'build', 'public', 'static', 'js')
  )
} catch (err) {
  // In development that folder might not exist, so ignore errors here
  debug(`build/static/js not found: ${err}`)
}
debug(`jsFiles: ${jsFiles}`)
app.use(
  express.static(path.resolve(__dirname, '..', 'build'), {
    index: false,
    setHeaders: (res, path) => {
      // Don't cache the serviceworker in the browser
      if (path.indexOf('sw.js')) {
        res.setHeader('Cache-Control', 'no-store')
        return
      }
    }
  })
)
app.get('/static/js/:name', (req, res, next) => {
  if (!req.params.name) return next()
  const existingFile = jsFiles.find(file => file.startsWith(req.params.name))
  if (existingFile) {
    debug(`existingFile found: ${existingFile}`)
    return res.sendFile(
      path.resolve(
        __dirname,
        '..',
        'build',
        'public',
        'static',
        'js',
        req.params.name
      )
    )
  }
  const match = req.params.name.match(/(\w+?)\.(\w+?\.)?js/i)
  if (!match) return next()
  const actualFilename = jsFiles.find(file => file.startsWith(match[1]))
  if (!actualFilename) return next()
  res.redirect(`/static/js/${actualFilename}`)
})

app.get('/*', renderer)

process.on('unhandledRejection', async err => {
  debug('Unhandled rejection', err)
  try {
    await new Promise(res => Raven.captureException(err, res))
  } catch (err) {
    debug('Raven error', err)
  } finally {
    process.exit(1)
  }
})

process.on('uncaughtException', async err => {
  debug('Uncaught exception', err)
  try {
    await new Promise(res => Raven.captureException(err, res))
  } catch (err) {
    debug('Raven error', err)
  } finally {
    process.exit(1)
  }
})

export default app

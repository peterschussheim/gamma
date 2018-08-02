const debug = require('debug')('renderer')
debug('Renderer starting...')
debug('logging with debug enabled')
require('cross-fetch')
import 'raf/polyfill'
import fs from 'fs'
import express from 'express'
import Loadable from 'react-loadable'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import { Prisma } from 'prisma-binding'

import Raven from 'shared/raven'
import toobusy from 'shared/middlewares/toobusy'
import { securityMiddleware } from 'shared/middlewares/securityMiddleware'
import cors from 'shared/middlewares/cors'
import session from 'shared/middlewares/session'
import renderer from './renderer'

// Big thanks to spectrum.chat team for this ssr architecture! :)

// Cache is disabled for now
// import cache from './cache'
// app.use(cache)

const { PRISMA_ENDPOINT, PRISMA_SECRET, PRISMA_DEBUG } = process.env
const prismaOptions = {
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  PRISMA_DEBUG
}

/**
 * Returns a newly constructed `Prisma` instance which can access
 * the underlying database as needed.
 */
const prisma = new Prisma({
  endpoint: prismaOptions.PRISMA_ENDPOINT,
  secret: prismaOptions.PRISMA_SECRET,
  debug: Boolean(DEBUG)
})

const getUser = async id => {
  return prisma.query.user({ where: { id } }, info)
}

const PORT = process.env.PORT || 3006

const app = express()

app.set('trust proxy', true)
app.use(toobusy)
securityMiddleware(app)

if (process.env.NODE_ENV === 'development') {
  const logging = require('shared/middlewares/logging')
  app.use(logging)
}

if (process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV) {
  const raven = require('shared/middlewares/raven').default
  app.use(raven)
}

app.use(cors)

// Redirect requests to /api and /auth to the production API
// This allows deploy previews to work, as this route would only be called
// if there's no path alias in Now for renderer.gamma.app/api, which would only
// happen on deploy previews
app.use('/api', (req, res) => {
  const redirectUrl = `${req.baseUrl}${req.path}`
  res.redirect(
    req.method === 'POST' || req.xhr ? 307 : 301,
    `https://gamma.app${redirectUrl}`
  )
})

app.use('/auth', (req, res) => {
  const redirectUrl = `${req.baseUrl}${req.path}`
  res.redirect(
    req.method === 'POST' || req.xhr ? 307 : 301,
    `https://gamma.app${redirectUrl}`
  )
})

app.use('/subscriptions', (req, res) => {
  const redirectUrl = `${req.baseUrl}${req.path}`
  res.redirect(
    req.method === 'POST' || req.xhr ? 307 : 301,
    `https://gamma.app${redirectUrl}`
  )
})

// In development the Webpack HMR server requests /sockjs-node constantly,
// so let's patch that through to it!
if (process.env.NODE_ENV === 'development') {
  app.use('/sockjs-node', (req, res) => {
    res.redirect(301, `http://localhost:3000${req.path}`)
  })
}

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(bodyParser.json())
app.use(session)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  getUser({ id })
    .then(user => {
      done(null, user)
    })
    .catch(err => {
      done(err)
    })
})
app.use(passport.initialize())
app.use(passport.session())

// Static files
// This route handles the case where our ServiceWorker requests main.asdf123.js, but
// we've deployed a new version of the app so the filename changed to main.dfyt975.js
let jsFiles
try {
  jsFiles = fs.readdirSync(
    path.resolve(__dirname, '..', 'build', 'static', 'js')
  )
} catch (err) {
  // In development that folder might not exist, so ignore errors here
  debug.error(err)
}
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
  if (existingFile)
    return res.sendFile(
      path.resolve(__dirname, '..', 'build', 'static', 'js', req.params.name)
    )
  const match = req.params.name.match(/(\w+?)\.(\w+?\.)?js/i)
  if (!match) return next()
  const actualFilename = jsFiles.find(file => file.startsWith(match[1]))
  if (!actualFilename) return next()
  res.redirect(`/static/js/${actualFilename}`)
})

// In dev the static files from the root public folder aren't moved to the
// build folder by create-react-app, so we just tell Express to serve those too
if (process.env.NODE_ENV === 'development') {
  app.use(
    express.static(path.resolve(__dirname, '..', 'public'), { index: false })
  )
}
app.get('*', renderer)

process.on('unhandledRejection', async err => {
  debug.error('Unhandled rejection', err)
  try {
    await new Promise(res => Raven.captureException(err, res))
  } catch (err) {
    debug.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

process.on('uncaughtException', async err => {
  debug.error('Uncaught exception', err)
  try {
    await new Promise(res => Raven.captureException(err, res))
  } catch (err) {
    debug.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

Loadable.preloadAll().then(() => {
  app.listen(PORT)
  debug(`Rendering service running at http://localhost:${PORT}`)
})

import redis from './redis'
const debug = require('debug')('renderer:cache')

if (process.env.DISABLE_CACHE) {
  console.log(
    'Cache disabled, either unset DISABLE_CACHE env variable or run in production mode to enable.'
  )
}

// Cache unauthenticated requests in Redis
const cache = (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (process.env.DISABLE_CACHE) return next()
  if (req.method !== 'GET') {
    debug(`${req.method} request came in, not caching`)
    return next()
  }
  if (req.user) {
    req.user.id &&
      typeof req.user.id === 'string' &&
      debug(`authenticated request by ${req.user.id}, not checking cache`)
    return next()
  }

  // Using req.path here (instead of req.url or req.originalUrl) to avoid sending unique pages
  // for query params, i.e. /gamma?bla=xyz will be treated the same as /gamma
  const key = req.path
  debug(`unauthenticated request, checking cache for ${req.path}`)
  redis.get(key).then(result => {
    if (result) {
      debug(`cached html found, sending to user`)
      res.send(result)
    } else {
      debug(`no result in cache found, forwarding to renderer`)
      next()
    }
  })
}

export default cache

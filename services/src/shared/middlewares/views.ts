const debug = require('debug')('shared:middlewares:views')
const url = require('url')
const util = require('util')

export default (req, res, next) => {
  if (!req.session.views) {
    req.session.views = {}
  }

  const { pathname } = url.parse(req.url, true)

  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  debug(`parsed url ${util.inspect(pathname)}`)
  next()
}

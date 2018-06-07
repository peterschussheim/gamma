const debug = require('debug')('shared:middlewares:logging')

module.exports = (req, res, next) => {
  debug(`requesting ${req.ip}`)
  debug(`req.user: ${req.user}`)
  debug(`req.request: ${req.request}`)
  next()
}

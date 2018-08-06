const debug = require('debug')('shared:middlewares:logging')

module.exports = (req, res, next) => {
  debug(`requesting ${req.url}`)
  next()
}

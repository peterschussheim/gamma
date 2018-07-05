const debug = require('debug')('shared:middlewares:views')
const util = require('util')

export default (req, res, next) => {
  debug(`req.sessionID ${util.inspect(req.sessionID)}`)
  debug(`req.session ${util.inspect(req.session)}`)
  next()
}

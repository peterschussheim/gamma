const debug = require('debug')('shared:middlewares:useragent')
import * as useragent from 'useragent'

export default (req, res, next) => {
  if (!req.session.ua) {
    req.session.ua = {}
  }

  const agent = useragent.parse(req.headers['user-agent']).toString()

  req.session.ua[agent] = new Date()
  // debug(`parsed url ${util.inspect(pathname)}`)
  next()
}

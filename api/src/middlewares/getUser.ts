const debug = require('debug')('api:middlewares:getUser')
import { Prisma } from '../generated/prisma'

const getUser = async (req, res, next, db: Prisma) => {
  debug(`req.session: ${req.session}`)
  if (!req.user || !req.session.userId) {
    return next()
  }
  req.user = await db.query.user({
    where: {
      id: req.session.userId
    }
  })
  if (!req.session.userId) {
    debug(`User ${req.session.userId} does not exist`)
    req.session.error = 'unauthorized'
    res.redirect('/auth/login')
  }
}

export default getUser

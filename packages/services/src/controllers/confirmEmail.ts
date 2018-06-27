const debug = require('debug')('api:routes:auth')
import { Request, Response, Router } from 'express'

import { Prisma } from '../generated/prisma'
import { redis } from '../redis'

async function confirmEmail(req, res, next, db: Prisma) {
  // pull the uuid off the request params
  const { confirmationID } = req.params
  debug(`CONFIRMATIONID: ${req.params}`)
  debug(`CONFIRMATIONID: ${confirmationID}`)
  // get userId using the confirmationID
  const userId = await redis.get(confirmationID)

  if (userId) {
    // update the `emailConfirmed` prop on this user to `true`
    await db.mutation.updateUser({
      where: { id: userId },
      data: { emailConfirmed: true }
    })

    // delete the `confirmationID` from redis
    await redis.del(confirmationID)
    res.status(200).send('ok')
    next()
  } else {
    return res.status(422).send()
  }
  next()
}

export { confirmEmail }

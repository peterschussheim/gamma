const debug = require('debug')('mutation:auth')
import * as bcrypt from 'bcryptjs'
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'
import * as jwt from 'jsonwebtoken'

export const auth = {
  async signup(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    })

    ctx.req.session.userId = user.id
    debug('New user created')
    debug('Returning signed token and user data')

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },

  async login(parent, args, ctx: Context, info) {
    const user = await ctx.db.query.user({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new AuthError()
    }

    // need to understand to complete flow for connect-redis, IE: how it
    // determines to create or reuse existing `sess` IDs in redis.
    // reuse existing session in redis
    // redis.hget(ctx.session.userId) ?????????

    ctx.req.session.userId = user.id
    debug(`UserID from session: ${ctx.req.session.userId}`)
    debug('Logging in existing user')
    debug('Returning signed token and user data')

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  }
}

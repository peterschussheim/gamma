const debug = require('debug')('mutation:auth')
import * as bcrypt from 'bcryptjs'
import { AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'
import * as jwt from 'jsonwebtoken'

export const auth = {
  async signup(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    })

    ctx.session.userId = user.id
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

    ctx.session.userId = user.id
    debug(`UserID from session: ${ctx.session.userId}`)
    debug('Logging in existing user')
    debug('Returning signed token and user data')

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  }
}

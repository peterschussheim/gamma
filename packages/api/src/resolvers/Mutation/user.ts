const debug = require('debug')('mutation:user')
const util = require('util')
import { Context } from '../../gamma'
import { getUserIdFromSession } from '../../utils/getUserId'

export const user = {
  updateUser: async(parent, args, ctx: Context, info) => {
    const userId = getUserIdFromSession(ctx)
    const updatedUser = ctx.db.mutation.updateUser(
      {
        where: { id: userId },
        data: args
      },
      info
    )
    return updatedUser
  },
  updateUserEmailStatus: async(parent, args, ctx: Context, info) => {
    debug(`args: ${util.inspect(args)}`)
    const userId = getUserIdFromSession(ctx)
    const data = {
      emailConfirmed: args.emailConfirmed
    }

    const updatedUser = ctx.db.mutation.updateUser(
      {
        where: { id: userId },
        data
      },
      info
    )
    return updatedUser
  }
}

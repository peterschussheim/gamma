const debug = require('debug')('resolvers:viewer')
import { getUserIdFromSession } from '../utils/getUserId'
import { Context } from '../gamma'

export const Viewer = {
  me: async (parent, args, ctx: Context, info) => {
    const id = getUserIdFromSession(ctx)
    debug(`ID::: ${id}`)
    return ctx.db.query.user({ where: { id } }, info)
  }
}

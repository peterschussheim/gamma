import { getUserIdFromSession } from '../utils/getUserId'
import { Context } from '../gamma'

export const Viewer = {
  bookings(_, args, ctx: Context, info) {
    const id = getUserIdFromSession(ctx)
    return ctx.db.query.bookings({ where: { bookee: { id } } }, info)
  },

  me(_, args, ctx: Context, info) {
    const id = getUserIdFromSession(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  }
}

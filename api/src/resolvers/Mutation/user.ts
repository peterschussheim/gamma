import { Context } from '../../gamma'
import { getUserIdFromSession } from '../../utils/getUserId'
import { UserUpdateInput } from '../../generated/prisma'

export const user = {
  updateUser(parent, args, ctx: Context, info) {
    const userId = getUserIdFromSession(ctx)
    const data = {}

    return ctx.db.mutation.updateUser(
      {
        where: { id: userId },
        data
      },
      info
    )
  }
}

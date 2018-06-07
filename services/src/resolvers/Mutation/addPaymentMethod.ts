import { getUserIdFromToken } from '../../utils/getUserId'
import { Context } from '../../gamma'

export async function addPaymentMethod(parent, args, ctx: Context, info) {
  const userId = getUserIdFromToken(ctx)
  await ctx.db.mutation.createPaymentAccount({
    data: {
      creditcard: { create: args },
      user: { connect: { id: userId } }
    }
  })

  // TODO: send email to user
  return { success: true }
}

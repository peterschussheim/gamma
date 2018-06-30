import { Context } from '../../gamma'

export const file = {
  renameFile: async (parent, { id, name }, ctx: Context, info) => {
    return ctx.db.mutation.updateFile({ data: { name }, where: { id } }, info)
  },
  deleteFile: async (parent, { id }, ctx: Context, info) => {
    return await ctx.db.mutation.deleteFile({ where: { id } }, info)
  }
}

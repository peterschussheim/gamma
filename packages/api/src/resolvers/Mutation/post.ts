const debug = require('debug')('mutation:post')
const util = require('util')
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'

export const post = {
  createPost: async (parent, args, ctx: Context, info) => {
    const newPost = await ctx.db.mutation.createPost({ data: args }, info)

    return newPost
  },
  updatePost: async (parent, args, ctx: Context, info) => {
    const userId = getUserIdFromSession(ctx)
    if (userId) {
      const updatedPost = await ctx.db.mutation.updatePost(
        { where: { id: args.id }, data: { content: args } },
        info
      )
      return updatedPost
    }
    return null
  },
  deletePost: async (parent, args, ctx: Context, info) => {
    const userId = getUserIdFromSession(ctx)
    if (userId) {
      const deletePostOperation = await ctx.db.mutation.deletePost(
        { where: { id: args.id } },
        info
      )
      return { success: true }
    }
    return { success: false }
  }
}

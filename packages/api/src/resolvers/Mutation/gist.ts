const debug = require('debug')('mutation:gist')
const util = require('util')
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'

export const gist = {
  createGist: async (parent, args, ctx: Context, info) => {
    const newPost = await ctx.db.mutation.createPost({ data: args }, info)

    return newPost
  }
}

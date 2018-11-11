const debug = require('debug')('mutation:post')
const util = require('util')
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'

export const post = {
  createPost: async (parent, args, ctx: Context, info) => {
    const newPost = ctx.db.mutation.createPost({ data: args }, info)

    return newPost
  }
}

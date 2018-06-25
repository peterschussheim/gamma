import { Context } from '../gamma'
import { getUserIdFromSession } from '../utils/getUserId'

// These queries can probably be refactored so that the authentication
// logic is handled as a graphql 'middleware'.
export const Query = {
  viewer: () => ({}),
  // TODO: add logic that allows a user to only view PUBLIC or their OWN posts
  postById: async (parent, args, ctx: Context, info) => {
    if (!getUserIdFromSession(ctx)) {
      ctx.response.send(401)
    }
    const post = await ctx.db.query.post({ where: { id: args.id } }, info)
    return post
  },

  // Refactor so that `orderBy` gets its value from `args` instead of hardcoding
  postsByDate: async (parent, args, ctx: Context, info) => {
    if (!getUserIdFromSession(ctx)) {
      ctx.response.send(401)
    }
    return ctx.db.query.posts({ orderBy: 'updatedAt_DESC' }, info)
  },

  tags: async (parent, args, ctx: Context, info) => {
    if (!getUserIdFromSession(ctx)) {
      ctx.response.send(401)
    }
    const tags = await ctx.db.query.tags({})
    return tags
  }
}

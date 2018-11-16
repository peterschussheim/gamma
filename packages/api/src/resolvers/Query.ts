const debug = require('debug')('resolvers:Query')
const util = require('util')
import * as Octokit from '@octokit/rest'
import { UnauthenticatedError } from '../utils/errors'
import { getUserIdFromSession } from '../utils/getUserId'
import { Context } from '../gamma'

export const Query = {
  getGistById: async (parent, args, ctx: Context, info) => {
    const fragment = ` {
      id
      githubProfile {
        accessTokens {
          token
        }
      }
    }
  `
    const id = getUserIdFromSession(ctx)
    if (id === 'unauthenticated' || null) {
      throw new UnauthenticatedError()
    }
    const {
      githubProfile: { accessTokens }
    } = await ctx.db.query.user({ where: { id } }, fragment)
    const [token] = accessTokens
    const { data } = await getGistById(token, { gist_id: args.gistId })
    // debug(`gist response:  ${util.inspect(data)}`)
    // tslint:disable-next-line:no-shadowed-variable
    const { url, public: isPublic, id: gistId, description, truncated } = data

    return {
      url,
      isPublic,
      gistId,
      files: [...getGistFiles(data)],
      description,
      truncated
    }
  },
  viewer: () => ({}),
  // TODO: add logic that allows a user to only view PUBLIC or their OWN posts
  postById: async (parent, args, ctx: Context, info) => {
    if (!getUserIdFromSession(ctx)) {
      ctx.res.send(401)
    }
    const post = await ctx.db.query.post({ where: { id: args.id } }, info)
    return post
  },
  // Refactor so that `orderBy` gets its value from `args` instead of hardcoding
  postsByDate: async (parent, args, ctx: Context, info) => {
    if (!getUserIdFromSession(ctx)) {
      ctx.res.send(401)
    }
    return ctx.db.query.posts({ orderBy: 'updatedAt_DESC' }, info)
  },
  tags: async (parent, args, ctx: Context, info) => {
    if (!getUserIdFromSession(ctx)) {
      ctx.res.send(401)
    }
    const tags = await ctx.db.query.tags({})
    return tags
  }
}

async function getGistById(
  accessToken,
  id: Octokit.GistsGetParams
): Promise<any> {
  const { token } = accessToken
  const ghClient = new Octokit()
  ghClient.authenticate({
    type: 'oauth',
    token
  })
  const result = await ghClient.gists.get(id)
  return result
}

function getGistFiles(gist) {
  const files = gist.files
  const gistFiles = []
  for (const [key, value] of Object.entries(files)) {
    if (files.hasOwnProperty(key)) {
      gistFiles.push(files[key])
    }
  }
  return gistFiles
}

const debug = require('debug')('resolvers:viewer')
const util = require('util')
import * as Octokit from '@octokit/rest'
import { UnauthenticatedError } from '../utils/errors'
import { getUserIdFromSession } from '../utils/getUserId'
import { Context } from '../gamma'

// tslint:disable-next-line:interface-name
interface GistFiles {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  truncated: boolean
  content: string
}

export const Viewer = {
  me: async (parent, args, ctx: Context, info) => {
    const id = getUserIdFromSession(ctx)
    if (id === 'unauthenticated' || null) {
      throw new UnauthenticatedError()
    }
    return ctx.db.query.user({ where: { id } }, info)
  },
  gists: async (parent, args, ctx: Context, info) => {
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
    const { data } = await getGists(token)
    const cleanGists = data.map((gist: Octokit.GistsGetAllResponseItem, i) => {
      const { url, public: isPublic, id: gistId, description, truncated } = gist

      return {
        url,
        isPublic,
        gistId,
        files: [...getGistFiles(gist)],
        description,
        truncated
      }
    })

    return cleanGists
  }
}

async function getGists(
  accessToken,
  options?: Octokit.GistsGetAllParams
): Promise<any> {
  const { token } = accessToken
  const ghClient = new Octokit()
  ghClient.authenticate({
    type: 'oauth',
    token
  })
  const result = await ghClient.gists.getAll(options)
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

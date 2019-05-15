const debug = require('debug')('mutation:gist')
const util = require('util')
import * as Octokit from '@octokit/rest'
import { UnauthenticatedError } from '../../utils/errors'
import { getUserIdFromSession } from '../../utils/getUserId'
import { Context } from '../../gamma'

export const gist = {
  createGist: async (parent, args, ctx: Context, info) => {
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
    const options = {
      files: { ...buildFilesObject(args.data.files) },
      description: args.data.description,
      public: args.data.isPublic
    }
    const { data } = await createGist(token, options)
    const {
      id: gistId,
      files,
      description,
      public: isPublic,
      created_at
    } = data
    return {
      gistId,
      files: [...createFilesArrayFromObject(files)],
      description,
      isPublic,
      created_at
    }
  },
  updateGist: async (parent, args, ctx: Context, info) => {
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
    const options = {
      gist_id: args.data.gistId,
      files: { ...buildFilesObject(args.data.files) },
      description: args.data.description
    }
    const { data } = await updateGist(token, options)
    const {
      id: gistId,
      files,
      description,
      public: isPublic,
      created_at,
      updated_at
    } = data
    return {
      gistId,
      files: [...createFilesArrayFromObject(files)],
      description,
      isPublic,
      created_at,
      updated_at
    }
  },
  deleteGist: async (parent, args, ctx: Context, info) => {
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
    const options = {
      gist_id: args.gistId
    }
    try {
      await deleteGist(token, options)
      return {
        success: true
      }
    } catch (error) {
      debug(`Error deleting gist: ${error}`)
      return {
        success: false
      }
    }
  }
}

async function createGist(
  accessToken,
  options: Octokit.GistsCreateParams
): Promise<any> {
  const { token } = accessToken
  const ghClient = new Octokit()
  ghClient.authenticate({
    type: 'oauth',
    token
  })
  const result = await ghClient.gists.create(options)
  return result
}

/**
 *
 * TODO: NOT YET IMPLEMENTED: To delete a file as part of a gist edit operation,
 * set the value of the filename to null.
 */
async function updateGist(
  accessToken,
  options: Octokit.GistsEditParams
): Promise<any> {
  const { token } = accessToken
  const ghClient = new Octokit()
  ghClient.authenticate({
    type: 'oauth',
    token
  })
  const result = await ghClient.gists.edit(options)
  return result
}

async function deleteGist(
  accessToken,
  options: Octokit.GistsDeleteParams
): Promise<any> {
  const { token } = accessToken
  const ghClient = new Octokit()
  ghClient.authenticate({
    type: 'oauth',
    token
  })
  const result = await ghClient.gists.delete(options)
  return result
}

/**
 * transform an array of [key, value] pairs into an object keyed by
 * `filename===key` where each key hold an object containing a key
 * of 'content' and value of the actual file content.
 */
function buildFilesObject(filesArray) {
  const filesObject = {}
  for (const file of filesArray) {
    filesObject[file.filename] = {
      filename: file.filename,
      content: file.content
    }
  }
  return filesObject
}

function createFilesArrayFromObject(filesObject) {
  const files = filesObject
  const gistFiles = []
  for (const [key, value] of Object.entries(files)) {
    if (files.hasOwnProperty(key)) {
      gistFiles.push(files[key])
    }
  }
  return gistFiles
}

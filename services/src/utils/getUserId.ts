const debug = require('debug')('utils:getUserId')
import * as jwt from 'jsonwebtoken'
import { Context } from '../gamma'
var util = require('util')

/**
 * Gets user id from token
 * @param ctx
 * @returns string user id from token
 */
export function getUserIdFromToken(ctx: Context): string {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as {
      userId: string
    }
    return userId
  }

  throw new AuthError(`Could not get userId from token`)
}

/**
 * Gets user id from session
 * @param ctx
 * @returns user id from session
 */
export function getUserIdFromSession(ctx: Context): string {
  /**
   * FIXME:
   *
   * Current behavior is as follows:
   *
   * 1) user exists in DB, but no cookie in their browser
   * 2) user sends login mutation and if successful, express server .....
   *
   */
  debug(`ctx.req: ${util.inspect(ctx.request.session)}`)
  if (ctx.request.session.userId) {
    return ctx.request.session.userId
  }

  throw new AuthError(`Could not get userId from session`)
}

/**
 * Auth error
 */
export class AuthError extends Error {
  constructor(message?: string) {
    super(`Not authorized: ${message}`)
  }
}

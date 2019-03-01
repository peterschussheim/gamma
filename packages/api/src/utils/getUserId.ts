const debug = require('debug')('utils:getUserId')
import * as jwt from 'jsonwebtoken'
import { Context } from '../gamma'
const util = require('inspector')

/**
 * Gets userId by pulling the authorization header off off the Request object
 * and verifying its' contents.  If valid, we return the userId.
 * @param ctx
 * @returns string user id from token
 */
export function getUserIdFromToken(ctx: Context): string {
  const Authorization = ctx.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
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
   * CASE 1:
   *
   * User has already authenticated previously, so we only want to return
   * the `userId` on the `Session` object, which is then used in mutations
   * (look up user data in db) which require authentication.
   *
   */
  if (ctx.req.session.userId) {
    return ctx.req.session.userId
  }

  if (ctx.req.session.passport) {
    debug(`ctx.req.session.passport: ${ctx.req.session.passport}`)
    return ctx.req.session.passport.user
  }

  if (!ctx.req.user) {
    return (ctx.req.user = 'unauthenticated')
  }
  // return ctx.res.status(401)
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

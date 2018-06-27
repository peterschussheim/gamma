const debug = require('debug')('utils:getUserId')
import * as jwt from 'jsonwebtoken'
import { Context } from '../gamma'
var util = require('inspector')
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
  // debug(`ctx.req: ${util.inspect(ctx.request.session)}`)

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

  /**
   * CASE 2:
   *
   * User has previously created an account and for whatever reason (manual
   * logout, different device/browser, etc), needs to authenticate.
   *
   * In this case, we need to send an appropriate message to the client app
   * so that the end user can proceed to either login or create a new account.
   *
   * ctx.res.send(403)???
   *
   */

  throw new AuthError(`Could not get userId from session`)
}

// export function getSessionId(ctx: Context): string {
//   debug(`ctx.req: ${util.inspect(ctx.request.session)}`)

//   if (ctx.request.session.userId) {
//     return ctx.request.session.userId
//   }

//   // throw new AuthError(`Could not get userId from session`)
// }

/**
 * Auth error
 */
export class AuthError extends Error {
  constructor(message?: string) {
    super(`Not authorized: ${message}`)
  }
}

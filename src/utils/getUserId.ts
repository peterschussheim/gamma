import * as jwt from 'jsonwebtoken'
import { Context } from '../gamma'

/**
 * Gets user id from token
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
  if (ctx.session.userId) {
    return ctx.session.userId
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

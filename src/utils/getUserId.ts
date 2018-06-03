import * as jwt from 'jsonwebtoken'
import { Context } from '../gamma'

export function getUserIdFromToken(ctx: Context): string {
  const Authorization = ctx.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as {
      userId: string
    }
    return userId
  }

  throw new AuthError()
}

export function getUserIdFromSession(ctx: Context): string {
  if (ctx.session.userId) {
    return ctx.session.userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
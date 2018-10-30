const debug = require('debug')('mutation:auth')
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
var util = require('util')
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'
import { sendConfirmationEmail } from '../../utils/email'
import { createConfirmEmailLink } from '../../utils/createConfirmEmailLink'
import {
  removeSingleSession,
  removeAllUserSessions
} from '../../utils/sessions'

import {
  UnauthenticatedError,
  AccountNotFoundError,
  ConfirmationTokenExpiredError,
  ConfirmEmailError,
  EmailInUseError,
  InvalidEmailFormatError,
  PostNotFoundError,
  PwResetTokenExpiredError
} from '../../utils/errors'

import { USER_SESSION_ID_PREFIX } from '../../constants'

export const auth = {
  signup: async (parent, args, ctx: Context, info) => {
    if (ctx.db.exists.User(args.email)) {
      throw new EmailInUseError()
    }
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    })

    if (process.env.NODE_ENV !== 'test') {
      const confirmationUrl = await createConfirmEmailLink(user.id, ctx.redis)

      await sendConfirmationEmail(user.email, confirmationUrl)
      debug(`Confirmation email sent to ${user.email}`)
      return { success: true }
    }
    return { success: false }

    // ctx.request.session.userId = user.id
    // if (ctx.request.sessionID) {
    //   debug(
    //     `Pushing current request sessionID into redis set: ${
    //       ctx.request.sessionID
    //     }`
    //   )
    //   // create and/or add a new set for this user and add the request.sessionID
    //   await ctx.redis.sadd(
    //     `${USER_SESSION_ID_PREFIX}${user.id}`,
    //     ctx.request.sessionID
    //   )
    // }
    // debug('New user created')
    // debug('Returning signed token and user data')

    // return {
    //   token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    //   user
    // }
  },

  login: async (parent, args, ctx: Context, info) => {
    // 1) Lookup given email in db using `where` clause (email is unique field)
    const user = await ctx.db.query.user({ where: { email: args.email } })
    const valid = await bcrypt.compare(args.password, user ? user.password : '')

    if (!user.emailConfirmed) {
      throw new ConfirmEmailError()
    }

    // 2) throw if user is not found or pw is invalid
    if (!valid || !user) {
      throw new AuthError()
    }

    // 3) Attach a key with userId === to the user's id in DB
    ctx.req.session.userId = user.id
    if (user.githubProfile) {
      debug(`GITHUB: ${user.githubProfile.githubUserId}`)
      ctx.req.session.githubId = user.githubProfile.githubUserId
    }

    if (ctx.req.sessionID) {
      debug(
        `Pushing current request sessionID into redis set: ${ctx.req.sessionID}`
      )
      // 4) create and/or add a new set for this user and add a the request.sessionID.
      await ctx.redis.sadd(
        `${USER_SESSION_ID_PREFIX}${user.id}`,
        ctx.req.sessionID
      )
    }
    debug(`Authenticating existing user: ${ctx.req.session.userId}`)
    debug('Returning signed token and user data')

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true
    })
    // 5) Send an object to the client with a JWT and the requested user object
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },
  resendConfirmationEmail: async (parent, args, ctx: Context, info) => {
    const user = await ctx.db.query.user({ where: { email: args.email } })
    if (user && user.emailConfirmed == false) {
      const confirmationUrl = await createConfirmEmailLink(user.id, ctx.redis)
      await sendConfirmationEmail(user.email, confirmationUrl)
      debug(`Confirmation email sent to ${user.email}`)
      return { success: true }
    }

    return { success: false }
  },
  logout: async (parent, args, ctx: Context, info) => {
    const userId = getUserIdFromSession(ctx)
    if (userId) {
      await removeSingleSession(ctx.req.sessionID, userId, ctx.redis)
      ctx.req.session.destroy(err => {
        if (err) {
          debug(`LOGOUT: ${err}`)
        }
      })
      // not sure if this is a proper logout mechanism
      ctx.res.clearCookie('token')
      return { success: true }
    }

    return { success: false }
  },
  logoutOfAllSessions: async (parent, args, ctx: Context, info) => {
    const userId = getUserIdFromSession(ctx)
    if (userId) {
      await removeAllUserSessions(userId, ctx.redis)

      ctx.req.session.destroy(err => {
        if (err) {
          debug(`LOGOUT: ${err}`)
        }
      })
      return { success: true }
    }
    return { success: false }
  }
}

const debug = require('debug')('mutation:auth')
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import hasPermission from '../../utils/permissions'
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'
import {
  removeSingleSession,
  removeAllUserSessions
} from '../../utils/sessions'
import { USER_SESSION_ID_PREFIX } from '../../constants'

export const auth = {
  signup: async (parent, args, ctx: Context, info) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    })

    ctx.request.session.userId = user.id
    debug('New user created')
    debug('Returning signed token and user data')

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },

  login: async (parent, args, ctx: Context, info) => {
    // 1) Lookup given email in db using `where` clause (email is unique field)
    const user = await ctx.db.query.user({ where: { email: args.email } })
    const valid = await bcrypt.compare(args.password, user ? user.password : '')

    // 2) throw if user is not found or pw is invalid
    if (!valid || !user) {
      throw new AuthError()
    }

    // 3) Attach a key with userId === to the user's id in DB
    ctx.request.session.userId = user.id

    if (ctx.request.sessionID) {
      debug(
        `Pushing current request sessionID into redis set: ${
          ctx.request.sessionID
        }`
      )
      // 4) create and/or add a new set for this user and add a the request.sessionID.
      await ctx.redis.sadd(
        `${USER_SESSION_ID_PREFIX}${user.id}`,
        ctx.request.sessionID
      )
    }
    debug(`Authenticating existing user: ${ctx.request.session.userId}`)
    debug('Returning signed token and user data')

    // 5) Send an object to the client with a JWT and the requested user object
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },

  logout: async (parent, args, ctx: Context, info) => {
    debug(`ctx.request.sessionID: ${ctx.request.sessionID}`)
    // 1) verify there is a user logged in
    const userId = getUserIdFromSession(ctx)
    if (userId) {
      // pass the sessionId from context
      // await removeSingleSession(ctx.request.sessionID, ctx.redis)
      // TODO: extract into function? or unnecessary?
      await ctx.redis.srem(
        `${USER_SESSION_ID_PREFIX}${userId}`,
        ctx.request.sessionID
      )
      // 3) call `destroy` method on current Session obj
      // TODO: verify `session.destroy` does not also clear the corresponding key in the session store.
      ctx.request.session.destroy(err => {
        if (err) {
          debug(`LOGOUT: ${err}`)
        }
      })
      // 4.success) succeeded
      return { success: true }
    }
    // 4.error) failed
    return { success: false }
  },

  // logoutOfAllDevices: async (parent, args, ctx: Context, info) => {
  //   // todo
  // },

  updateUser: async (parent, args, ctx: Context, info) => {
    const userId = getUserIdFromSession(ctx)
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        data: args,
        where: { id: userId }
      },
      info
    )
    return updatedUser
  }

  // async updatePermissions(parent, args, ctx: Context, info) {
  //   const userId = ctx.request.userId
  //   const currentUser = await ctx.db.query.user({ where: { id: userId } }, info)
  //   if (!currentUser) {
  //     throw new Error('You Must be logged in to update permissions')
  //   }
  //   hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE'])
  //   return ctx.db.mutation.updateUser(
  //     {
  //       data: {
  //         permissions: {
  //           set: args.permissions
  //         }
  //       },
  //       where: { id: args.userId }
  //     },
  //     info
  //   )
  // }
}

const debug = require('debug')('api:initAuth')
const util = require('util')

import * as passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

import { Prisma, User } from './generated/prisma'
import { IS_PROD } from './config'

const GITHUB_CLIENT_SECRET = IS_PROD
  ? process.env.GITHUB_CLIENT_SECRET_PROD
  : process.env.GITHUB_CLIENT_SECRET_DEV

const GITHUB_CLIENT_ID = IS_PROD
  ? process.env.GITHUB_CLIENT_ID_PROD
  : process.env.GITHUB_CLIENT_ID_DEV

const CALLBACK_URL = IS_PROD
  ? 'https://gamma.app/auth/github/callback'
  : 'http://localhost:4000/auth/github/callback'

/**
 *
 * Scenarios we need to handle:
 *
 * - Linking Accounts: user exists in db, add a social account to their DB profile
 * - Account Creation: user does not exist in the database, then create a DB profile
 * - Unlinking: Unlinking social accounts
 * - Reconnecting: If a user unlinked a social account, but wants to reconnect it
 *
 */
const isSerializedJSON = (str: string) =>
  str[0] === '{' && str[str.length - 1] === '}'

export const init = (prisma: Prisma) => {
  // passport.serializeUser((user: any, done) => {
  //   debug(`serializing user: ${JSON.stringify(user)}`)
  //   done(null, user)
  // })
  passport.serializeUser((user, done) => {
    done(null, typeof user === 'string' ? user : JSON.stringify(user))
  })

  passport.deserializeUser((data: any, done) => {
    if (isSerializedJSON(data)) {
      let user
      try {
        user = JSON.parse(data)
      } catch (err) {}

      if (user && user.id && user.createdAt) {
        return done(null, user)
      }
    }

    return prisma.query
      .user({ where: { email: data } })
      .then(user => {
        done(null, user)
        return null
      })
      .catch(err => {
        done(err)
        return null
      })
  })

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: ['user', 'gist'],
        passReqToCallback: true
      },
      async (req, token, tokenSecret, profile, done) => {
        const name =
          profile.displayName || profile.username || profile._json.name || ''
        const splitProfileUrl = profile.profileUrl.split('/')
        const fallbackUsername = splitProfileUrl[splitProfileUrl.length - 1]
        const githubUsername =
          profile.username || profile._json.login || fallbackUsername
        const email =
          (profile.emails &&
            profile.emails.length > 0 &&
            profile.emails[0].value) ||
          null
        const profilePhoto =
          (profile._json.avatar_url && profile._json.avatar_url) || null
        const node_id = profile._json.node_id || null

        // if req.user does not exist, this user has not connected with github
        if (!req.user) {
          // if session has a userId property, update the record for this user
          // in DB
          if (req.session.userId) {
            debug(`Connecting existing account to GitHub`)
            debug(`userId: ${req.session.userId}`)
            return prisma.mutation
              .createGithubProfile({
                data: {
                  profileOwner: { connect: { email } },
                  githubEmail: email,
                  login: githubUsername,
                  githubUserId: profile.id,
                  accessTokens: { create: { token } },
                  node_id,
                  name,
                  profilePhoto
                }
              })
              .then(user => {
                done(null, user)
                return user
              })
              .catch(err => {
                done(err)
                return null
              })
          }
          return done(null, req.user)
        }
      }
    )
  )
}

const debug = require('debug')('api:githubAuth')

import * as passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

import { Prisma, User, GithubProfile } from './generated/prisma'
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

export const init = (prisma: Prisma) => {
  passport.serializeUser((user: User, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(({ id }: User, done) => {
    prisma.query
      .user({ where: { id } })
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
        const website = profile._json.blog || null
        const node_id = profile._json.node_id || null
        const bio = profile._json.bio || null

        // if req.user does not exist, this user has not connected with github
        if (!req.user) {
          // if session has a userId property, update the record for this user
          // in DB
          if (req.session.userId) {
            debug(`userId: ${req.session.userId}`)
            return prisma.mutation
              .createGithubProfile({
                data: {
                  profileOwner: { connect: { id: req.session.userId } },
                  githubEmail: email,
                  login: githubUsername,
                  githubUserId: profile.id,
                  node_id,
                  bio,
                  name,
                  website,
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
        }
      }
    )
  )
}

const debug = require('debug')('api:githubAuth')

import * as session from 'express-session'
import * as passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

import { User } from '../generated/prisma'

export const init = prisma => (req, res) => {
  const getUser = async ({ id }) => {
    if (id) return await prisma.query.user({ where: { id } })
    return null
  }

  const getUserByEmail = async ({ email }) => {
    const user = await prisma.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }

    return user
  }

  const getUserByGithubId = async ({ githubProviderId }) => {
    const user = await prisma.query.user({ where: { githubProviderId } })
    if (!user) {
      throw new Error(
        `No user found for GitHub account ID: ${githubProviderId}`
      )
    }

    return user
  }

  /**
   * Update a user's data
   */
  const updateUser = async (user, data) => {
    const updatedUser = await prisma.mutation.updateUser({
      where: { id: user.id },
      data
    })
    return updatedUser
  }

  /**
   * if a user id gets passed in, we know that a user most likely exists
   * and we just need to retrieve them from the db.
   *
   * however, if a user id doesn't exist we need to do a lookup by the email
   * address passed in - if an email address doesn't exist, we know that
   * we're going to be creating a new user.
   *
   * 1) user.id ? getUser({id}) : null
   * else if (we find user.email in our DB)
   * 2) getUserByEmail ? updateUser....
   * else, no account exists, create fresh account with githubInfo
   * 3) prisma.mutation.user(user obj)???
   */
  const createUser = async user => {
    const newUser = await prisma.mutation.createUser({
      data: { ...user }
    })
  }

  passport.serializeUser((user: User, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    getUser({ id })
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
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL:
          process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000/login/github/callback'
            : 'https://gamma.app/login/github/callback',
        scope: ['user'],
        passReqToCallback: true
      },
      async (req, token, tokenSecret, profile, done) => {
        const name =
          profile.displayName || profile.username || profile._json.name || ''

        const splitProfileUrl = profile.profileUrl.split('/')
        const fallbackUsername = splitProfileUrl[splitProfileUrl.length - 1]
        const githubUsername =
          profile.username || profile._json.login || fallbackUsername

        if (req.user) {
          // if a user exists in the request body, it means the user is already
          // authenticated and is trying to connect a github account.
          //
          // Account exists in DB:
          // 1. The user doesn't have an existing githubProviderId on their user
          // 2. The providerId returned from GitHub isnt' being used by another user

          // 1
          // if the user already has a `githubProviderId` BUT does not have a
          // `githubUsername` associated, update that user with
          // their githubUsername.
          if (req.user.githubProviderId) {
            if (!req.user.githubUsername) {
              const updatedUser = {
                githubProviderId: profile.id,
                githubProfile: {
                  githubUsername,
                  name: name,
                  description: profile._json.bio,
                  website: profile._json.blog,
                  email:
                    (profile.emails &&
                      profile.emails.length > 0 &&
                      profile.emails[0].value) ||
                    null,
                  profilePhoto:
                    (profile._json.avatar_url && profile._json.avatar_url) ||
                    null
                }
              }
              return updateUser(req.user.id, updatedUser)
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

          const existingUserWithProviderId = await getUserByGithubId(profile.id)

          // 2
          // if no user exists with this provider id (github),
          if (!existingUserWithProviderId) {
            const updatedUser = {
              githubProviderId: profile.id,
              githubProfile: {
                githubUsername,
                name: name,
                description: profile._json.bio,
                website: profile._json.blog,
                email:
                  (profile.emails &&
                    profile.emails.length > 0 &&
                    profile.emails[0].value) ||
                  null,
                profilePhoto:
                  (profile._json.avatar_url && profile._json.avatar_url) || null
              }
            }
            return updateUser(req.user.id, updatedUser)
              .then(user => {
                done(null, user)
                return user
              })
              .catch(err => {
                done(err)
                return null
              })
          }

          // a user with this providerId has already created an account.
          if (existingUserWithProviderId) {
            return done(null, req.user)
          }
        }

        const user = {
          githubProviderId: profile.id,
          githubProfile: {
            githubUsername,
            username: null,
            name: name,
            description: profile._json.bio,
            website: profile._json.blog,
            email:
              (profile.emails &&
                profile.emails.length > 0 &&
                profile.emails[0].value) ||
              null,
            profilePhoto:
              (profile._json.avatar_url && profile._json.avatar_url) || null
          }
        }

        return createUser(user)
          .then(user => {
            done(null, user)
            return user
          })
          .catch(err => {
            done(err)
            return null
          })
      }
    )
  )
}

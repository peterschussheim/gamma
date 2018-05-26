// @flow
// require('now-env')
const debug = require('debug')('api:authentication')
const passport = require('passport')
const { Strategy: GitHubStrategy } = require('passport-github2')
const {
  getUser,
  createOrFindUser,
  saveUserProvider,
  getUserByIndex
} = require('./sql/models')

const IS_PROD = !process.env.FORCE_DEV && process.env.NODE_ENV === 'production'

const GITHUB_CLIENT_SECRET = IS_PROD
  ? process.env.GITHUB_CLIENT_SECRET
  : process.env.GITHUB_CLIENT_SECRET_DEVELOPMENT

const GITHUB_CLIENT_ID = IS_PROD
  ? 'REPLACEME'
  : process.env.GITHUB_CLIENT_ID_DEVELOPMENT

const init = () => {
  // Setup use serialization
  passport.serializeUser((user, done) => {
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

  // Set up GitHub login
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
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
          // authed and is trying to connect a github account. Before we do so
          // we need to make sure that:
          // 1. The user doesn't have an existing githubProviderId on their user
          // 2. The providerId returned from GitHub isnt' being used by another user

          // 1
          // if the user already has a githubProviderId, don't override it
          if (req.user.githubProviderId) {
            if (!req.user.githubUsername) {
              return saveUserProvider(
                req.user.id,
                'githubProviderId',
                profile.id,
                { githubUsername: githubUsername }
              )
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

          const existingUserWithProviderId = await getUserByIndex(
            'githubProviderId',
            profile.id
          )

          // 2
          // if no user exists with this provider id, it's safe to save on the req.user's object
          if (!existingUserWithProviderId) {
            return saveUserProvider(
              req.user.id,
              'githubProviderId',
              profile.id,
              { githubUsername: githubUsername }
            )
              .then(user => {
                done(null, user)
                return user
              })
              .catch(err => {
                done(err)
                return null
              })
          }

          // if a user exists with this provider id, don't do anything and return
          if (existingUserWithProviderId) {
            return done(null, req.user)
          }
        }

        const user = {
          providerId: null,
          githubProviderId: profile.id,
          githubUsername: githubUsername,
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
            (profile._json.avatar_url && profile._json.avatar_url) || null,
          createdAt: new Date(),
          lastSeen: new Date()
        }

        return createOrFindUser(user, 'githubProviderId')
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

export { init }

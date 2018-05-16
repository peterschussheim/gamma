// import passport from 'passport'
// import { Strategy as GitHubStrategy } from 'passport-github2'
// import knex from './sql/connector'
// var session = require('express-session')
// // var RedisStore = require('connect-redis')(session)
// import { redis } from './redis'

// const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NODE_ENV } = process.env

// const store = new RedisStore({
//   redis
// })

// export function setUpGitHubLogin(app) {
//   console.log(passport)
//   if (!GITHUB_CLIENT_ID) {
//     console.warn("GitHub client ID not passed; login won't work.") // eslint-disable-line no-console
//     return null
//   }

//   const gitHubStrategyOptions = {
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL:
//       NODE_ENV !== 'production'
//         ? 'http://localhost:3000/login/github/callback'
//         : 'https://gamma.app/login/github/callback'
//   }

//   passport.use(
//     new GitHubStrategy(
//       gitHubStrategyOptions,
//       (accessToken, refreshToken, profile, cb) => {
//         cb(null, profile)
//       }
//     )
//   )

//   passport.serializeUser((user, cb) => {
//     cb(null, user)
//   })
//   passport.deserializeUser((obj, cb) => {
//     cb(null, obj)
//   })

//   app.use(
//     session({
//       name: 'session1',
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//       store
//     })
//   )

//   app.use(passport.initialize())
//   app.use(passport.session())

//   app.get('/login/github', passport.authenticate('github'))

//   app.get(
//     '/login/github/callback',
//     passport.authenticate('github', { failureRedirect: '/' }),
//     (req, res) => res.redirect('/')
//   )

//   app.get('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/')
//   })

//   return store
// }

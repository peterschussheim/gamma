import { Router } from 'express'
import * as passport from 'passport'

const githubAuthRouter = Router()

// GET https://api.gamma.app/auth/github
githubAuthRouter.get('/', passport.authenticate('github'))

// GET https://api.gamma.app/auth/github/callback
githubAuthRouter.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    console.log(`REQ.USER: ${req.user}`)
    res.cookie('github-passport', new Date())
    // res.redirect('/')
  }
)

export default githubAuthRouter

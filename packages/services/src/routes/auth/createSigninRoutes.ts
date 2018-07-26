const debug = require('debug')('api:createSigninRoutes')

import * as passport from 'passport'
import { URL } from 'url'
import isGammaUrl from '../../utils/isGammaUrl'
// import { signCookie, getCookies } from 'shared/cookie-utils'

const IS_PROD = !process.env.FORCE_DEV && process.env.NODE_ENV === 'production'

// const FALLBACK_URL = IS_PROD ? 'https://gamma.app/' : 'http://localhost:3000/'

type Strategy = 'github' | 'local'

export const createSigninRoutes = (
  strategy: Strategy,
  strategyOptions?: Object
) => {
  return {
    main: (req, ...rest) => {
      debug(`MAIN:REQ.USER: ${req.user}`)
      return passport.authenticate(strategy, strategyOptions)(req, ...rest)
    },
    callbacks: [
      passport.authenticate(strategy, {
        // successRedirect: '/callback',
        failureRedirect: IS_PROD ? '/login' : 'http://localhost:3000/login'
      }),
      (req, res) => {
        debug(`REQ.USER: ${req.user}`)
        return res.redirect('http://localhost:4000/auth/github/')
      }
    ]
  }
}

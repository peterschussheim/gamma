const debug = require('debug')('api:createSigninRoutes')

import * as passport from 'passport'
import { URL } from 'url'
import isGammaUrl from '../../utils/isGammaUrl'

const IS_PROD = !process.env.FORCE_DEV && process.env.NODE_ENV === 'production'
const FALLBACK_URL = IS_PROD ? 'https://gamma.app/' : 'http://localhost:3000/'

type Strategy = 'github' | 'local'

/*
 *
 * Usage:
 *
 * const { main, callbacks } = createSigninRoutes('github')
 * githubRouter.get('/', main)
 * githubRouter.get('/callback', ...callbacks)
 */
export const createSigninRoutes = (
  strategy: Strategy,
  strategyOptions?: Object
) => {
  return {
    main: (req, ...rest) => {
      let url = FALLBACK_URL
      if (typeof req.query.r === 'string' && isGammaUrl(req.query.r)) {
        url = req.query.r
      }

      // attach redirectUrl and auth provider to session obj
      req.session.redirectUrl = url
      return passport.authenticate(strategy, strategyOptions)(req, ...rest)
    },
    callbacks: [
      passport.authenticate(strategy, {
        failureRedirect: IS_PROD ? '/' : 'http://localhost:3000/'
      }),
      (req, res) => {
        const redirectUrl = req.session.redirectUrl
          ? new URL(req.session.redirectUrl)
          : new URL(FALLBACK_URL)

        // redirectUrl.searchParams.append('authed', 'true')

        // delete redirectUrl so it is not used next time user authorizes
        req.session.redirectUrl = undefined
        res.cookie('_now_no_cache', '1', {
          maxAge: 315569260000, // 10 years
          sameSite: 'lax',
          secure: false
        })

        return res.redirect(redirectUrl.href)
      }
    ]
  }
}

/*
* A reusable set of routes for signing in with different providers. Handles token-based authentication.
* Usage:
*
* const { main, callbacks } = createSigninRoutes('github');
* github.get('/', main);
* github.get('/callback', ...callbacks);
*/
const debug = require('debug')('api:auth:createSigninRoutes')

import * as passport from 'passport'
import { URL } from 'url'
import isGammaUrl from '../../../utils/isGammaUrl'
import { signCookie, getCookies } from '../../../shared/cookieUtils'
const IS_PROD = process.env.NODE_ENV === 'production'
const FALLBACK_URL = IS_PROD ? 'https://gamma.app' : 'http://localhost:3000'

export const createSigninRoutes = (strategy, strategyOptions) => {
  return {
    // The main route takes care of storing the redirect URL in the session
    // and passing the right options
    main: (req, ...rest) => {
      let url = FALLBACK_URL
      if (typeof req.query.r === 'string' && isGammaUrl(req.query.r)) {
        url = req.query.r
      }

      // Attach the redirectURL and authType to the session so we have it in the /auth/github/callback route
      req.session.redirectUrl = url
      if (req.query.authType === 'token') {
        req.session.authType = 'token'
      }

      return passport.authenticate(strategy, strategyOptions)(req, ...rest)
    },
    // The callbacks take care of authenticating, setting the response cookies,
    // redirecting to the right place and handling tokens
    callbacks: [
      passport.authenticate(strategy, {
        failureRedirect: IS_PROD ? '/' : 'http://localhost:3000/'
      }),
      (req, res) => {
        const redirectUrl = req.session.redirectUrl
          ? new URL(req.session.redirectUrl)
          : new URL(FALLBACK_URL)
        redirectUrl.searchParams.append('authed', 'true')

        // Add the session cookies to the query params if token authentication
        if (
          req.session.authType === 'token' &&
          req.session.passport &&
          req.session.passport.user
        ) {
          const cookies = getCookies({ userId: req.session.passport.user })

          redirectUrl.searchParams.append(
            'accessToken',
            signCookie(
              `session=${cookies.session}; session.sig=${
                cookies['session.sig']
              }`
            )
          )
        }

        req.session.authType = undefined
        // Delete the redirectURL from the session again so we don't redirect
        // to the old URL the next time around
        req.session.redirectUrl = undefined
        return res.redirect(redirectUrl.href)
      }
    ]
  }
}
import session from '../shared/middlewares/session'

/**
 * Get the sessions' users' ID of a req manually, needed for websocket authentication
 */
export const getUserIdFromReq = (req: any): Promise<string> =>
  new Promise((res, rej) => {
    session(req, {}, err => {
      if (err) return rej(err)
      if (!req.session || !req.session.passport || !req.session.passport.user)
        return rej()

      return res(req.session.passport.user)
    })
  })

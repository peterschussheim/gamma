import session from '../shared/middlewares/session'

/**
 * Get the sessions' users' ID of a req manually, needed for websocket authentication
 */
export const getUserIdFromReq = (req: any): Promise<string> =>
  new Promise((res, rej) => {
    session(req, {}, err => {
      if (err) return rej(err)
      if (!req.session) return rej()

      return res(req.session.userId)
    })
  })
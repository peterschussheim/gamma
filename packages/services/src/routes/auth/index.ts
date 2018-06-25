// const debug = require('debug')('api:routes:auth')
// import { Request, Response, Router } from 'express'
// import { redis } from '../../redis'

// const IS_PROD = process.env.NODE_ENV === 'production'
// const HOME = IS_PROD ? '/' : 'http://localhost:3000/'
// const authRouter = Router()

// export const confirmEmail = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const userId = await redis.get(id)
//   if (userId) {
//     await User.update({ id: userId }, { confirmed: true })
//     await redis.del(id)
//     res.send('ok')
//   } else {
//     res.send('invalid')
//   }
// }

// authRouter.get('/logout', (req, res) => {
//   req.session = null
//   return res.redirect(HOME)
// })

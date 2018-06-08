import { Router } from 'express'
const debug = require('debug')('api:routes:auth:logout')

const IS_PROD = process.env.NODE_ENV === 'production'
const HOME = IS_PROD ? '/' : 'http://localhost:3000/'
const logoutRouter = Router()

logoutRouter.get('/', (req, res) => {
  req.session = null
  return res.redirect(HOME)
})

export default logoutRouter

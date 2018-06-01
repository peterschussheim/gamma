// @flow
import { Router } from 'express'
import { createSigninRoutes } from './createSigninRoutes'

const githubAuthRouter = Router()
const { main, callbacks } = createSigninRoutes('github', {
  scope: ['read:user,user:email']
})

githubAuthRouter.get('/', main)

githubAuthRouter.get('/callback', ...callbacks)

export default githubAuthRouter

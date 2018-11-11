import { Router } from 'express'

import { createSigninRoutes } from './createSigninRoutes'

const githubAuthRouter = Router()
const { main, callbacks } = createSigninRoutes('github', {
  scope: ['user', 'gist'],
  state: true
})

githubAuthRouter.get('/', main)

githubAuthRouter.get('/callback', ...callbacks)

export default githubAuthRouter

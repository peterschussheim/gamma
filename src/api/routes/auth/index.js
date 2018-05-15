// @flow
import { Router } from 'express'
import githubAuthRoutes from './github'
import logoutRoutes from './logout'

const authRouter = Router()

authRouter.use('/github', githubAuthRoutes)
authRouter.use('/logout', logoutRoutes)

export default authRouter

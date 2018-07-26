import * as cors from 'cors'

export default cors({
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? ['https://gamma.app', /gamma\.app/, /api-(\w|-)+\.gamma\.app/g]
      : [/localhost/, /github\.com/],
  preflightContinue: true
})

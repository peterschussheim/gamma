import * as cors from 'cors'

export default cors({
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'https://gamma.app',
          /gamma-(\w|-)+\.now\.sh/g,
          /gamma\.app/,
          /services-(\w|-)+\.now\.sh/g,
          // REMOVE ASAP
          /localhost/
        ]
      : [/localhost/],
  preflightContinue: true
})

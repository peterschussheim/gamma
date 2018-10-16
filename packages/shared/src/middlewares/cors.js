import cors from 'cors'

export default cors({
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'https://gamma.app',
          /\.gamma\.app$/,
          /(\.|https:\/\/)now\.sh$/
        ].filter(Boolean)
      : [/localhost/, /github\.com/],
  preflightContinue: true
})

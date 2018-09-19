import cors from 'cors'

export default cors({
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'https://gamma.app',
          /\.gamma\.app$/,
          process.env.NOW_URL,
          'https://zeit.co',
          /(\.|https:\/\/)zeit\.sh$/
        ].filter(Boolean)
      : [/localhost/, /github\.com/],
  preflightContinue: true
})

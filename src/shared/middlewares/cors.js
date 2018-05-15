import cors from 'cors'

export default cors({
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? ['https://gamma.app', /gamma-(\w|-)+\.now\.sh/g, /gamma\.app/]
      : [/localhost/],
  credentials: true
})

const { GraphQLServer, PubSub } = require('graphql-yoga')
const { ApolloEngine } = require('apollo-engine')
import { generateSchema } from './utils/generateSchema'

const pubsub = new PubSub()
const port = parseInt(process.env.PORT, 10) || 4000
const graphQLServer = new GraphQLServer({
  schema: generateSchema(),
  resolvers,
  context: { pubsub }
})

if (process.env.ENGINE_API_KEY) {
  const engine = new ApolloEngine({
    apiKey: process.env.ENGINE_API_KEY
  })

  const httpServer = graphQLServer.createHttpServer({
    tracing: true,
    cacheControl: true
  })

  engine.listen(
    {
      port,
      httpServer,
      graphqlPaths: ['/']
    },
    () =>
      console.log(
        `Server with Apollo Engine is running on http://localhost:${port}`
      )
  )
} else {
  graphQLServer.start(
    {
      port
    },
    () => console.log(`Server is running on http://localhost:${port}`)
  )
}

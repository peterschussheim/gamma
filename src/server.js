/* @flow */
const compression = require('compression')
const debug = require('debug')('api')
const uuid = require('node-uuid')
debug('Server starting...')
debug('logging with debug enabled!')
import { ApolloServer, gql } from 'apollo-server'
import { registerServer } from 'apollo-server-express'
import express from 'express'
import { setUpGitHubLogin } from './api/githubLogin'
import 'express-async-errors'
import logger from './shared/middlewares/logging'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

async function startServer() {
  const app = express()

  //TODO: https://apollographql.slack.com/archives/C5SFWTR4Y/p1526075563000183
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  registerServer({ app, server })

  server.listen(PORT).then(({ url }) => {
    debug(`🚀 Server ready at ${url}`)
  })
}
export default startServer

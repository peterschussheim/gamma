/* @flow */
const compression = require('compression')
const debug = require('debug')('api')
const uuid = require('node-uuid')
debug('Server starting...')
debug('logging with debug enabled!')
import { ApolloServer, gql } from 'apollo-server'
import express from 'express'
import { registerServer } from 'apollo-server-express'
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
      origins: [{ requestTimeout: '80s' }]
    }
  })
  registerServer({ app, server })

  server
    .listen({ PORT, engine: true, apiKey: process.env.APOLLO_ENGINE_API_KEY })
    .then(({ url }) => {
      debug(`🚀 Server ready at ${url}`)
    })
}
export default startServer

/* @flow */
const compression = require('compression')
const debug = require('debug')('api')
const uuid = require('node-uuid')
debug('Server starting...')
debug('logging with debug enabled!')
import { ApolloServer, gql, ForbiddenError } from 'apollo-server'
import express from 'express'
import { registerServer } from 'apollo-server-express'
import 'express-async-errors'
import logger from './shared/middlewares/logging'
import { generateSchema } from './utils/generateSchema'
var faker = require('faker')

var randomName = faker.name.findName() // Rowan Nikolaus
var randomEmail = faker.internet.email() // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard() // random contact card containing many properties

const mocks = {}

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello ${faker.name.findName()}!`
  }
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

// const context = ({ req }) => {
//   const user = myAuthenticationLookupCode(req)
//   if (!user) {
//     throw new ForbiddenError(
//       'You need to be authenticated to access this schema!'
//     )
//   }

//   const scope = lookupScopeForUser(user)

//   return { user, scope }
// }

async function startServer() {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
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

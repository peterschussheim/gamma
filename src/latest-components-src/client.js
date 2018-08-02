import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
  errorLink,
  queryOrMutationLink,
  subscriptionLink,
  requestLink
} from 'shared/graphql/links'

import { Layout } from './routes/layout'

const NODE_ENV = process.env.NODE_ENV || 'development'

const IS_PROD = process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
const API_URI = IS_PROD ? '/api' : 'http://localhost:4000/api'
const WS_URI = IS_PROD
  ? `wss://${window.location.host}/subscriptions`
  : 'ws://localhost:4000/subscriptions'

const links = [
  errorLink,
  requestLink({
    queryOrMutationLink: queryOrMutationLink({
      uri: API_URI
    }),
    subscriptionLink: subscriptionLink({ uri: WS_URI })
  })
]

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)

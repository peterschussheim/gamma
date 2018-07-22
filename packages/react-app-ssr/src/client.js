import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
  errorLink,
  queryOrMutationLink,
  subscriptionLink,
  requestLink
} from './links'

import { Layout } from './routes/Layout'

const links = [
  errorLink,
  requestLink({
    queryOrMutationLink: queryOrMutationLink(),
    subscriptionLink: subscriptionLink()
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

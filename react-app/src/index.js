import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

const httpLink = new HttpLink({
  uri: process.env.GAMMA_APP_SERVER_URI,
  credentials: 'include'
})

// currently not working as expected.  Need to verify app server is configured
// properly to spin up a ws connection
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true
    // connectionParams: {
    //   Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    // }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  errorLink,
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))

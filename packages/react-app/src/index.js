import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import {
  errorLink,
  requestLink,
  subscriptionLink,
  queryOrMutationLink
} from './config/links'

const API_URI = `${process.env.REACT_APP_API_BASE_URI}/graphql`
const LOCAL_API_URI = 'http://localhost:4000/graphql'

const links = [
  errorLink,
  requestLink({
    queryOrMutationLink: queryOrMutationLink({
      uri: process.env.NODE_ENV === 'production' ? API_URI : LOCAL_API_URI
    }),
    subscriptionLink: subscriptionLink()
  })
]

const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache: new InMemoryCache()
})

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))
registerServiceWorker()

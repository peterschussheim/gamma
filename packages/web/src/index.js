import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { BACKEND_API_ENDPOINT, BACKEND_WS_ENDPOINT } from './config/index'
import {
  errorLink,
  requestLink,
  subscriptionLink,
  queryOrMutationLink
} from './config/links'

const links = [
  errorLink,
  requestLink({
    queryOrMutationLink: queryOrMutationLink({
      uri: BACKEND_API_ENDPOINT
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
    <div>hi</div>
  </ApolloProvider>
)

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))
registerServiceWorker()

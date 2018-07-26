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
console.log(`${BACKEND_API_ENDPOINT}, ${BACKEND_WS_ENDPOINT}`)
console.log(
  `${process.env.REACT_APP_BACKEND_API_ENDPOINT}, ${
    process.env.REACT_APP_BACKEND_WS_ENDPOINT
  }`
)
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
  </ApolloProvider>
)

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))
registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Router } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'

import ApolloClient from 'apollo-client'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Routes from './hot-routes'
import { history } from './utils/history'

import {
  errorLink,
  queryOrMutationLink,
  subscriptionLink,
  requestLink
} from './config/links'

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

const App = () => {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Router history={history}>
          <Routes />
        </Router>
      </ApolloProvider>
    </HelmetProvider>
  )
}

window.main = () => {
  Loadable.preloadReady()
    .then(() => {
      ReactDOM.hydrate(<App />, document.getElementById('root'))
    })
    .catch(err => {
      console.error(`Error hydrating react client app: ${err}`)
    })
}

if (module.hot) {
  module.hot.accept()
}

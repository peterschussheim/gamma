import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Router } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from 'react-apollo'

import Routes from './routes'
import { history } from './utils/history'

import { cache, errorLink, requestLink } from './apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'

const links = [errorLink, requestLink]

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </HelmetProvider>
    </ApolloProvider>
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

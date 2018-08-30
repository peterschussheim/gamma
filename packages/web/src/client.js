import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Router } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from 'react-apollo'

import Routes from './hot-routes'
import { history } from './utils/history'
import { API_URI, WS_URI, IS_PROD } from './constants'
import { client } from './config/apollo'
console.log(`[CLIENT] apollo ssr enabled: ${client.ssrMode}`)
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

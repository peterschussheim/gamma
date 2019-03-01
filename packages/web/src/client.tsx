import * as React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

import { cache, errorLink, requestLink } from './apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { EditorProvider } from './components/CodeEditor/EditorProvider'
import Router from './Router'
import './styles.css'
const links = [errorLink, requestLink]

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  // @ts-ignore
  cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache
})

class GammaEntry extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <EditorProvider>
            <Router />
          </EditorProvider>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

ReactDOM.hydrate(<GammaEntry />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}

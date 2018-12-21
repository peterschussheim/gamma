import * as React from 'react'
import Routes from './routes'
import { history } from './utils/history'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router-dom'

import { cache, errorLink, requestLink } from './apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'

import { EditorProvider } from './components/MonacoEditor/EditorContext'
import './styles.css'

const links = [errorLink, requestLink]

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache
})

/**
 * Use the following module on the client only.  For the server 'App',
 * we construct the app in the `server/index.js` file since it has different
 * options.
 */
export default () => {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <Router history={history}>
          <EditorProvider>
            <Routes />
          </EditorProvider>
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  )
}
// export default class App extends React.Component {
//   state = {
//     activeFile: null
//   }
//   render() {
//     return (
//       <ApolloProvider client={client}>
//         <HelmetProvider>
//           <Router history={history}>
//             <Routes />
//           </Router>
//         </HelmetProvider>
//       </ApolloProvider>
//     )
//   }
// }

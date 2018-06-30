import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
// import { getMainDefinition } from 'apollo-utilities'
// import { WebSocketLink } from 'apollo-link-ws'

import App from './App'

const httpLink = new HttpLink({
  // uri: `http://${process.env.REACT_APP_GAMMA_APP_SERVER_URI}`,
  uri: 'https://api.gamma.app',
  credentials: 'include'
})

const request = async operation => {
  // const token = await localStorage.getItem('token')
  operation.setContext({
    fetchOptions: {
      credentials: 'include'
    }
    // headers
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) {
        console.error(`APOLLO CLIENT NETWORK ERROR: ${networkError}`)
        // logoutUser();
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } })
            return null
          }
        }
      },
      cache: new InMemoryCache()
    }),
    httpLink
  ]),
  cache: new InMemoryCache()
})
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/subscriptions`,
//   options: {
//     reconnect: true
//     // connectionParams: {
//     //   Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
//     // }
//   }
// })

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   errorLink,
//   wsLink,
//   httpLink
// )

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// })

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))

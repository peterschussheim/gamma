import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { RetryLink } from 'apollo-link-retry'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import { IS_PROD, API_URI, WS_URI } from '../constants'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const wsLink = process.browser
  ? new WebSocketLink({
      uri: WS_URI,
      options: {
        reconnect: true
      }
    })
  : null

// Use the exported client instance from below instead of using this factory!
// Only use this factory if you need to create a new instance of the client
// with the Authorization token, i.e. only use this factory on mobile
export const createClient = options => {
  // TODO: properly implement cache/state restore
  const cache = new InMemoryCache()

  const retryLink = new RetryLink({
    attempts: (count, operation, error) => {
      const isMutation =
        operation &&
        operation.query &&
        operation.query.definitions &&
        Array.isArray(operation.query.definitions) &&
        operation.query.definitions.some(
          def =>
            def.kind === 'OperationDefinition' && def.operation === 'mutation'
        )

      if (isMutation) {
        return !!error && count < 25
      }

      // setting query retries TOO high will cause excessive loading screens
      return !!error && count < 6
    }
  })

  const httpLink = retryLink.concat(
    createUploadLink({
      uri: API_URI,
      credentials: 'include'
    })
  )

  // Switch between the two links based on runtime environment and operation
  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLink
      )
    : httpLink

  return new ApolloClient({
    link,
    // eslint-disable-next-line
    cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache,
    // ssrForceFetchDelay: 100,
    ssrMode: process.browser ? false : true,
    queryDeduplication: true
  })
}

const client = createClient()

export { client }

export const clearApolloStore = () => {
  try {
    client.resetStore()
  } catch (e) {
    console.error('error clearing store')
  }
}

import { createUploadLink } from 'apollo-upload-client'
import { RetryLink } from 'apollo-link-retry'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import { API_URI, WS_URI } from '../constants'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const cache = new InMemoryCache()

export const retryLink = new RetryLink({
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

export const wsLink = (config = {}) =>
  process.browser
    ? new WebSocketLink({
        uri: WS_URI,
        options: {
          reconnect: true
        },
        ...config
      })
    : null

export const httpLink = retryLink.concat(
  createUploadLink({
    uri: API_URI,
    credentials: 'include'
  })
)

export const requestLink = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink(),
      httpLink
    )
  : httpLink

export const clearApolloStore = clientInstance => {
  try {
    clientInstance.resetStore()
  } catch (e) {
    console.error('error clearing store')
  }
}

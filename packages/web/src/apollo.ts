import { createHttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import { API_URI, WS_URI } from './constants'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        // tslint:disable-next-line:max-line-length
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

export const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
})

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
    return !!error && count < 3
  }
})

export const wsLink = (config = {}) =>
  // @ts-ignore
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
  createHttpLink({
    uri: API_URI,
    credentials: 'include'
  })
)

interface Definition {
  kind: string
  operation?: string
}

// @ts-ignore
export const requestLink = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation }: Definition = getMainDefinition(query)
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

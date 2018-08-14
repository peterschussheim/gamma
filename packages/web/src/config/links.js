import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const subscriptionLink = (config = {}) =>
  new WebSocketLink({
    options: {
      reconnect: true
    },
    ...config
  })

export const queryOrMutationLink = (config = {}) =>
  new HttpLink({
    ...config,
    credentials: 'include'
  })

export const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    subscriptionLink,
    queryOrMutationLink
  )

export const clearApolloStore = apolloClient => {
  try {
    apolloClient.resetStore()
  } catch (e) {
    debug(`Error clearing apollo store: ${e}`)
  }
}

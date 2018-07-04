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
    uri:
      process.env.NODE_ENV !== 'production'
        ? 'ws://localhost:4000/subscriptions'
        : 'wss://api.gamma.com/subscriptions',
    options: { reconnect: true },
    ...config
  })

export const queryOrMutationLink = (
  config = { uri: `${process.env.REACT_APP_API_BASE_URI}` }
) =>
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

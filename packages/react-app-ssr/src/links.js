import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'

const NODE_ENV = process.env.NODE_ENV || 'development'
const BACKEND_WS_ENDPOINT =
  NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_WS_ENDPOINT
    : 'ws://localhost:4000/subscriptions'

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
    uri: BACKEND_WS_ENDPOINT,
    options: {
      reconnect: true
    },
    credentials: 'include',
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

export type GraphQLResponseRoot = {
  data?: Query | Subscription,
  errors?: Array<GraphQLResponseError>
}

export type GraphQLResponseError = {
  /** Required for all errors */
  message: string,
  locations?: Array<GraphQLResponseErrorLocation>,
  /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
  [propName: string]: any
}

export type GraphQLResponseErrorLocation = {
  line: number,
  column: number
}

export type Query = {
  __typename: 'Query',
  me: User | null
}

export type User = {
  __typename: 'User',
  id: string,
  email: string
}

export type Subscription = {
  __typename: 'Subscription',
  counter: Counter
}

export type Counter = {
  __typename: 'Counter',
  count: number,
  countStr: string | null
}

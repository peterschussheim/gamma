const NODE_ENV = process.env.NODE_ENV || 'development'

export const BACKEND_API_ENDPOINT =
  NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_API_ENDPOINT
    : 'http://localhost:4000/graphql'

export const BACKEND_WS_ENDPOINT =
  NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_WS_ENDPOINT
    : 'ws://localhost:4000/subscriptions'

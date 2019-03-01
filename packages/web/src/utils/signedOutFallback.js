import * as React from 'react'
import queryString from 'query-string'

// This is the component that determines at render time what to do
const Switch = props => {
  const { Component, FallbackComponent, currentUser, ...rest } = props
  const { authed } = queryString.parse(props.location.search)
  if ((!currentUser && !authed) || !Component) {
    return <FallbackComponent {...rest} />
  } else {
    return <Component {...rest} />
  }
}

const signedOutFallback = (Component, FallbackComponent) => {
  return props => (
    <Switch
      {...props}
      FallbackComponent={FallbackComponent}
      Component={Component}
    />
  )
}

export default signedOutFallback

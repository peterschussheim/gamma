import * as React from 'react'
import PropTypes from 'prop-types'

export default function Error({ error }) {
  if (!error || !error.message) {
    return null
  }
  return (
    <React.Fragment>
      <pre>NAME: {JSON.stringify(error.name)}</pre>
      <pre>MESSAGE: {JSON.stringify(error.message)}</pre>
      <pre>GRAPHQL ERRORS: {JSON.stringify(error.graphQLErrors)}</pre>
      <pre>NETWORK ERROR: {JSON.stringify(error.networkError)}</pre>
      <pre>
        <em>STACK: </em>
      </pre>
      {error.stack.split('\n').map((line, i) => (
        <pre key={i}>{line}</pre>
      ))}
    </React.Fragment>
  )
}

Error.defaultProps = {
  error: {}
}

Error.propTypes = {
  error: PropTypes.object
}

import * as React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        // @ts-ignore
        staticContext.status = code
      }

      return children
    }}
  />
)

Status.defaultProps = {
  code: 200
}

Status.propTypes = {
  code: PropTypes.number,
  children: PropTypes.element.isRequired
}

export default Status

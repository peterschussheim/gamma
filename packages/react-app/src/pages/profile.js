import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import { VIEWER } from '../queries'

export default () => (
  <Query query={VIEWER}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (data) {
        const { id, email } = data.viewer.me

        return (
          <React.Fragment>
            <div>{id}</div>
            <div>{email}</div>
          </React.Fragment>
        )
      }
      // not logged in
      return (
        <p>
          <Link to="/login/github">Auth with GitHub</Link>
        </p>
      )
    }}
  </Query>
)

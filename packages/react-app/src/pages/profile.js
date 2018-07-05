import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import { VIEWER } from '../queries'
import { AuthButton } from '../components/buttons'

export default () => (
  <Query query={VIEWER}>
    {({ loading, error, data: { viewer } }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error : ${error}(</p>
      else if (viewer) {
        const { id, email } = viewer.me

        return (
          // not logged in
          <React.Fragment>
            <div>{id}</div>
            <div>{email}</div>
            <AuthButton />
            <Link to="/">
              <button type="button">Home</button>
            </Link>
          </React.Fragment>
        )
      }
    }}
  </Query>
)

import React from 'react'
import { Query } from 'react-apollo'
import { VIEWER } from '../queries'

export default () => (
  <Query query={VIEWER}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error : ${error}(</p>

      const { id, email } = data.viewer.me

      return (
        <React.Fragment>
          <div>{id}</div>
          <div>{email}</div>
        </React.Fragment>
      )
    }}
  </Query>
)

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const VIEWER = gql`
  {
    viewer {
      me {
        id
        email
      }
    }
  }
`

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

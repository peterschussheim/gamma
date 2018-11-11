import React from 'react'
import { Mutation } from 'react-apollo'
import { LOGOUT } from '../queries'

const Logout = props => {
  return (
    <Mutation mutation={LOGOUT}>
      {(logout, { client }) => (
        <button
          data-cy="logout-button"
          onClick={async () => {
            await logout()
            await client.resetStore()
          }}
        >
          Logout
        </button>
      )}
    </Mutation>
  )
}

export default Logout

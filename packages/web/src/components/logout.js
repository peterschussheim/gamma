import React from 'react'
import { Mutation } from 'react-apollo'
import { LOGOUT } from '../queries'
import { BlueButton } from './buttons'

const Logout = props => {
  return (
    <Mutation mutation={LOGOUT}>
      {(logout, { client }) => (
        <BlueButton
          data-cy="logout-button"
          onClick={async () => {
            await logout()
            await client.resetStore()
          }}
        >
          Logout
        </BlueButton>
      )}
    </Mutation>
  )
}

export default Logout

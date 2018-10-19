import React from 'react'
import { Mutation } from 'react-apollo'
import { LOGOUT, VIEWER } from '../queries'

const Logout = () => {
  return (
    <Mutation mutation={LOGOUT} refetchQueries={[{ query: VIEWER }]}>
      {logout => (
        <button data-cy="logout-button" onClick={logout}>
          Logout
        </button>
      )}
    </Mutation>
  )
}

export default Logout

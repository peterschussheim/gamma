import React from 'react'
import { Mutation } from 'react-apollo'
import { LOGOUT, VIEWER } from '../queries'

export default () => {
  return (
    <Mutation mutation={LOGOUT} refetchQueries={[{ query: VIEWER }]}>
      {logout => <button onClick={logout}>Logout</button>}
      {/* {logout => <button onClick={logout}>Logout</button>} */}
    </Mutation>
  )
}

import * as React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { VIEWER_ME } from '../queries'
import Logout from './logout'
import RenderError from './error'

class User extends React.Component {
  initialState = { user: null, error: null, pending: false }
  state = this.initialState

  reset(overrides) {
    const newState = { ...this.initialState, ...overrides }
    this.setState(newState)
    return newState
  }

  render() {
    return (
      <Query query={VIEWER_ME}>
        {({ loading, error, data }) =>
          error && error.message.includes('Not authorized') ? (
            <div>
              <span>You aren't logged in!</span>
              <Link to="/auth/login">Login</Link>
            </div>
          ) : !loading && data.viewer ? (
            <Me data={data} />
          ) : (
            <RenderError error={error} />
          )
        }
      </Query>
    )
  }
}

function Me(props) {
  return (
    <React.Fragment>
      <div>
        ID:
        {props.data.viewer.me.id}
      </div>
      <div>
        EMAIL:
        {props.data.viewer.me.email}
      </div>
      <Logout />
    </React.Fragment>
  )
}

export default User

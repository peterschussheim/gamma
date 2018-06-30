import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { LOGIN, VIEWER, REGISTER } from '../queries'
import Loading from './loading'
import Login from './login'
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
      <Query query={VIEWER}>
        {({ loading, error, data }) =>
          loading ? (
            <Loading />
          ) : error ? (
            error.message.includes('Not authorized') ? (
              <div>
                <span>You aren't logged in!</span>
                <Login />
              </div>
            ) : (
              <RenderError error={error} />
            )
          ) : data ? (
            <React.Fragment>
              <div>
                ID:
                {data.viewer.me.id}
              </div>
              <div>
                EMAIL:
                {data.viewer.me.email}
              </div>
              <Logout />
            </React.Fragment>
          ) : null
        }
      </Query>
    )
  }
}

export default User

// class User extends React.Component {
//   initialState = { user: null, error: null, pending: false }
//   state = this.initialState

//   reset(overrides) {
//     const newState = { ...this.initialState, ...overrides }
//     this.setState(newState)
//     return newState
//   }

//   componentDidMount() {
//     this.reset({ pending: true })
//     return VIEWER.me().then(
//       ({ user }) => this.reset({ user }),
//       ({ error }) => Promise.reject(this.reset({ error }))
//     )
//   }

//   login = (...args) => {
//     this.reset({ pending: true })
//     return LOGIN(...args).then(
//       ({ user }) => this.reset({ user }),
//       ({ error }) => Promise.reject(this.reset({ error }))
//     )
//   }

//   // logout = () => {
//   //   this.reset({ pending: true })
//   //   return logout().then(
//   //     () => this.reset(),
//   //     ({ error }) => Promise.reject(this.reset({ error }))
//   //   )
//   // }

//   register = (...args) => {
//     this.reset({ pending: true })
//     return REGISTER(...args).then(
//       ({ user }) => this.reset({ user }),
//       ({ error }) => Promise.reject(this.reset({ error }))
//     )
//   }

//   render() {
//     return this.props.children({
//       ...this.state,
//       login: this.login,
//       // logout: this.logout,
//       register: this.register
//     })
//   }
// }

import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { LOGIN, VIEWER, REGISTER } from '../queries'
import Loading from './loading'

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
            <RenderError error={error} />
          ) : data ? (
            // make sure this logic isnt preventing the login a tag from loading..
            <React.Fragment>
              <div>
                ID:
                {data.viewer.me.id}
              </div>
              <div>
                EMAIL:
                {data.viewer.me.email}
              </div>
            </React.Fragment>
          ) : (
            <div>
              <span>You aren't logged in!</span>
              <a href="/login">LOGIN</a>
            </div>
          )
        }
      </Query>
    )
  }
}

function RenderError({ error }) {
  return (
    <React.Fragment>
      <pre>NAME: {JSON.stringify(error.name)}</pre>
      <pre>MESSAGE: {JSON.stringify(error.message)}</pre>
      <pre>GRAPHQL ERRORS: {JSON.stringify(error.graphQLErrors)}</pre>
      <pre>NETWORK ERROR: {JSON.stringify(error.networkError)}</pre>
      <pre>
        <em>STACK: </em>
      </pre>
      {error.stack.split('\n').map((line, i) => <pre key={i}>{line}</pre>)}
    </React.Fragment>
  )
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

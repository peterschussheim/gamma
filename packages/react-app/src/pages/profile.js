import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'

import { VIEWER } from '../queries'
import auth from '../utils/auth'

class Profile extends React.Component {
  static defaultProps = {
    authUrl: '/auth/github'
  }
  defaultState = {
    isAuthenticated: auth.isAuthenticated,
    isLoading: false,
    userInfo: null,
    error: null,
    refreshAuth: () => true
  }
  state = { ...this.defaultState }

  toggleLoading = () => {
    this.setState({
      ...this.state,
      isLoading: true,
      userInfo: null,
      error: null
    })
  }

  fetchSuccess = data => {
    this.setState({
      ...this.state,
      userInfo: data,
      isLoading: false,
      error: null
    })
  }

  fetchFail = err => {
    this.setState({
      ...this.state,
      userInfo: null,
      isLoading: false,
      error: err
    })
  }

  handleAuthorizeWithGithub = () => {
    const oThis = this
    const { reqOptions } = this.props

    let options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    }

    if (!!reqOptions && typeof reqOptions === 'function') {
      options = reqOptions()
    } else if (!!reqOptions) {
      options = reqOptions
    }

    this.toggleLoading()
    return fetch(this.props.authUrl, options)
      .then(function(response) {
        if (response.status !== 200) {
          return response.json().then(r => {
            return Promise.reject(r)
          })
        }
        return response.json()
      })
      .then(function(json) {
        oThis.fetchSuccess(json)
      })
      .catch(function(ex) {
        oThis.fetchFail(ex)
      })
  }
  render() {
    return (
      <Query query={VIEWER}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          } else if (data) {
            const { id, email } = data.viewer.me

            return (
              <React.Fragment>
                <div>{id}</div>
                <div>{email}</div>
                <button type="button" onClick={this.handleAuthorizeWithGithub}>
                  Connect to Github Via server
                </button>
                <button
                  type="button"
                  onClick={auth.logout(() => this.props.history.push('/'))}
                >
                  Logout
                </button>
              </React.Fragment>
            )
          }
          // not logged in
          return (
            <p>
              <Link to="/login">Authenticate with PW</Link>
            </p>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Profile)

import React from 'react'
import { Mutation } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { Input } from './inputs'
import Form from './form'
import RenderError from './error'
import { LOGIN, VIEWER } from '../queries'
import fakeAuth from '../utils/auth'

class Login extends React.Component {
  initialState = { email: '', password: '', redirectToReferrer: false }
  state = this.initialState

  handleLogin = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, email, password } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <Mutation
        mutation={LOGIN}
        variables={this.state}
        refetchQueries={[{ query: VIEWER }]}
      >
        {(login, { error }) => (
          <Form
            onSubmit={e => {
              e.preventDefault()
              login()
            }}
          >
            <RenderError error={error} />
            <label style={{ justifySelf: 'right' }} htmlFor="email-input">
              email
            </label>
            <Input
              value={email}
              onChange={this.handleChange}
              id="email-input"
              placeholder="email..."
              name="email"
              style={{ flex: 1 }}
            />
            <label style={{ justifySelf: 'right' }} id="password-input">
              Password
            </label>
            <Input
              value={password}
              onChange={this.handleChange}
              placeholder="Password..."
              type="password"
              name="password"
              aria-labelledby="password-input"
            />
            <button type="submit">Login</button>
            <Link to="/signup">
              <button type="button">Signup</button>
            </Link>
            <Link to="/login/github">
              <button type="button">Connect to GitHub</button>
            </Link>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Login

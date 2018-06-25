import React from 'react'
import { Mutation } from 'react-apollo'
import { Input } from './inputs'
import Form from './form'
import RenderError from './error'
import Loading from './loading'
import { LOGIN, VIEWER } from '../queries'

class Login extends React.Component {
  initialState = { email: '', password: '' }
  state = this.initialState

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN}
        variables={this.state}
        refetchQueries={[{ query: VIEWER }]}
      >
        {(login, { loading, error }) => (
          <Form
            onSubmit={e => {
              e.preventDefault()
              login()
            }}
          >
            <RenderError error={error} />
            <Loading loading={loading} />
            <label style={{ justifySelf: 'right' }} htmlFor="email-input">
              email
            </label>
            <Input
              value={this.state.email}
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
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password..."
              type="password"
              name="password"
              aria-labelledby="password-input"
            />
            <button type="submit">Sign In!</button>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Login

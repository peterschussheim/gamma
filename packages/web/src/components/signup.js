import React from 'react'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { Input } from './form/inputs'
// import Form from './form'
import RenderError from './error'
import { REGISTER, VIEWER } from '../queries'

class Signup extends React.Component {
  initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    redirectToReferrer: false,
    error: null
  }
  state = this.initialState

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  // handleReset = () => {
  //   this.setState
  // }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const {
      firstName,
      lastName,
      email,
      password,
      redirectToReferrer
    } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <Mutation
        mutation={REGISTER}
        variables={this.state}
        refetchQueries={[{ query: VIEWER }]}
        errorPolicy="all"
      >
        {(signup, { error }) => (
          <Form
            onSubmit={e => {
              e.preventDefault()
              signup()
              this.setState({ redirectToReferrer: true })
            }}
          >
            <RenderError error={error} />
            <label style={{ justifySelf: 'right' }} htmlFor="firstName-input">
              First Name
            </label>
            <Input
              value={firstName}
              onChange={this.handleChange}
              id="firstName-input"
              placeholder="First Name..."
              name="firstName"
              style={{ flex: 1 }}
            />
            <label style={{ justifySelf: 'right' }} htmlFor="lastName-input">
              Last Name
            </label>
            <Input
              value={lastName}
              onChange={this.handleChange}
              id="lastName-input"
              placeholder="last Name..."
              name="lastName"
              style={{ flex: 1 }}
            />
            <label style={{ justifySelf: 'right' }} htmlFor="email-input">
              email
            </label>
            <Input
              value={email}
              onChange={this.handleChange}
              id="email-input"
              placeholder="email..."
              name="email"
              autoComplete="username email"
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
              autoComplete="current-password"
              aria-labelledby="password-input"
            />
            <button data-cy="signup-button" type="submit">
              Signup
            </button>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signup

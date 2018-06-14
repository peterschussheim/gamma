import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import ErrorBoundary from 'react-error-boundary'
import { Form } from './components/form'
import { Input } from './components/inputs'
const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`

class App extends Component {
  // state = {
  //   email: '',
  //   password: ''
  // }

  // handleChange = e => {
  //   const { name, value } = e.target
  //   this.setState({ [name]: value })
  // }

  // handleLogin = async ({ mutate }) => {
  //   const { email, password } = this.state
  //   const { token } = await mutate({ variables: { email, password } })
  //   localStorage.setItem('token', token)
  //   window.location('/viewer')
  // }

  render() {
    return (
      <Mutation mutation={LOGIN}>
        {(login, { data }) => (
          <ErrorBoundary>
            <div>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  const { email, password } = e.target.elements
                  login({
                    variables: { email, password }
                  })
                }}
              >
                <label style={{ justifySelf: 'right' }} htmlFor="email-input">
                  Email
                </label>
                <Input
                  id="email-input"
                  placeholder="email"
                  name="email"
                  style={{ flex: 1 }}
                />
                <label style={{ justifySelf: 'right' }} id="password-input">
                  Password
                </label>
                <Input
                  placeholder="Password..."
                  type="password"
                  name="password"
                  aria-labelledby="password-input"
                />
                <React.Fragment>
                  <Link to="/viewer">to auth page</Link>
                </React.Fragment>
              </Form>
            </div>
          </ErrorBoundary>
        )}
      </Mutation>
    )
  }
}

export default App

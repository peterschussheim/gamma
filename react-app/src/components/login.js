import React from 'react'
import { Input } from './inputs'
import Form from './form'

function Login({ onSubmit }) {
  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault()
          const { email, password } = e.target.elements
          onSubmit({
            email: email.value,
            password: password.value
          })
        }}
      >
        <label style={{ justifySelf: 'right' }} htmlFor="email-input">
          email
        </label>
        <Input
          id="email-input"
          placeholder="email..."
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
      </Form>
    </div>
  )
}

export default Login

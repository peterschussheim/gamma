import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, withFormik } from 'formik'

import { Debug } from './formDebugger'
import { LOGIN, VIEWER } from '../../queries'
import { validLoginSchema } from '../../utils/schemas'

const onFinish = () => {
  const {
    history,
    location: { state }
  } = this.props
  if (state && state.next) {
    return history.push(state.next)
  }

  history.push('/')
}

const Login = props => {
  const { mutate, values, touched, errors, handleSubmit } = props
  return (
    <div>
      <h1>Login</h1>
      <Formik
        validLoginSchema={validLoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          mutate({ variables: values }).then(
            () => {
              actions.setSubmitting(false)
              // updateUser(updatedUser)
              // onClose()
            },
            error => {
              actions.setSubmitting(false)
              actions.setErrors(error)
            }
          )
        }}
        render={({ errors, isSubmitting, handleReset }) => (
          <Form>
            <label style={{ justifySelf: 'right' }} htmlFor="email">
              Email
            </label>{' '}
            <Field
              type="email"
              placeholder="email..."
              name="email"
              autoComplete="username email"
              style={{ flex: 1 }}
            />
            <ErrorMessage name="email" component="div" />
            <label style={{ justifySelf: 'right' }} htmlFor="password">
              Password
            </label>{' '}
            <Field
              type="password"
              placeholder="Password..."
              name="password"
              autoComplete="current-password"
              aria-labelledby="password"
              style={{ flex: 1 }}
            />
            <ErrorMessage name="password" className="error" component="div" />
            {errors && errors.message && <div>ERROR: {errors.message}</div>}
            <button
              type="reset"
              className="secondary"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              data-cy="login-button"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <Link to="/auth/signup">
              <button data-cy="signup-button" type="button">
                Signup
              </button>
            </Link>
            <Debug />
          </Form>
        )}
      />
    </div>
  )
}

export default compose(
  graphql(LOGIN, {
    options: {
      refetchQueries: [{ query: VIEWER }]
    }
  })
)(Login)

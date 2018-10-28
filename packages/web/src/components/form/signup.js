import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import { Debug } from './formDebugger'
import { VIEWER, REGISTER } from '../../queries'
import { validLoginSchema } from '../../utils/schemas'

const Signup = props => {
  const { mutate } = props
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        validLoginSchema={validLoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
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
            <label style={{ justifySelf: 'right' }} htmlFor="name">
              Name
            </label>{' '}
            <Field
              type="text"
              placeholder="Name"
              name="name"
              style={{ flex: 1 }}
            />
            <ErrorMessage name="name" component="div" />
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
              data-cy="signup-button"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <Link to="/auth/login">
              <button data-cy="login-button" type="button">
                Login
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
  graphql(REGISTER, {
    options: {
      refetchQueries: [{ query: VIEWER }]
    }
  })
)(Signup)

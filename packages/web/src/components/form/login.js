import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import { TextInput } from './inputs'
import { Debug } from './formDebugger'
import { LOGIN, VIEWER } from '../../queries'
import { validLoginSchema } from '../../utils/schemas'

const Login = props => {
  const { mutate } = props
  return (
    <Formik
      validationSchema={validLoginSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => {
        mutate({ variables: values }).then(
          () => {
            actions.setSubmitting(false)
            props.history.push('/')
          },
          error => {
            actions.setSubmitting(false)
            const errors = error.graphQLErrors.map(e => e.message)
            actions.setErrors({ email: '', password: '', form: errors })
          }
        )
      }}
      render={({
        values,
        errors,
        dirty,
        isSubmitting,
        handleBlur,
        handleChange,
        handleReset,
        touched
      }) => (
        <Form>
          {errors.form ? <div data-cy="form-error">{errors.form}</div> : null}
          <TextInput
            id="email"
            type="email"
            label="Email"
            placeholder="email@domain.tld"
            error={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            autoComplete="username email"
            data-cy="email-input"
          />
          <TextInput
            id="password"
            type="password"
            label="Password"
            placeholder="Password..."
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete="current-password"
            aria-labelledby="password"
            data-cy="password-input"
          />
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
            disabled={!dirty || isSubmitting}
          >
            Submit
          </button>
          <Link to="/auth/signup">
            <button data-cy="signup-button" type="button">
              Signup
            </button>
          </Link>
        </Form>
      )}
    />
  )
}

export default compose(
  graphql(LOGIN, {
    options: {
      refetchQueries: [{ query: VIEWER }],
      fetchPolicy: 'network-only'
    }
  })
)(Login)

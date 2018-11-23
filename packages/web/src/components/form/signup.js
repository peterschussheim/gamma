import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { GreenButton } from '../buttons'
import { TextInput } from './inputs'
import { VIEWER_ME, REGISTER } from '../../queries'
import { validRegistrationSchema } from '../../utils/schemas'

const Signup = props => {
  const { mutate } = props
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        validationSchema={validRegistrationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        onSubmit={(values, actions) => {
          mutate({ variables: values }).then(
            () => {
              actions.setSubmitting(false)
              props.history.push('/confirm')
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
              id="name"
              type="text"
              label="Name"
              placeholder="Name"
              error={touched.name && errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              data-cy="name-input"
            />
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
            <GreenButton
              data-cy="signup-button"
              type="submit"
              disabled={!dirty || isSubmitting}
            >
              Submit
            </GreenButton>
            <GreenButton
              type="reset"
              className="secondary"
              disabled={!dirty || isSubmitting}
              onClick={handleReset}
            >
              Reset
            </GreenButton>
            <Link to="/auth/login">
              <GreenButton data-cy="login-button" type="button">
                Login
              </GreenButton>
            </Link>
          </Form>
        )}
      />
    </div>
  )
}

export default compose(
  graphql(REGISTER, {
    options: {
      refetchQueries: [{ query: VIEWER_ME }]
    }
  })
)(Signup)

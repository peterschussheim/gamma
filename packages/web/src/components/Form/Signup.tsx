import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { DefaultButton } from '../Buttons'
import { TextInput } from './Inputs'
import { VIEWER_ME, REGISTER } from '../../queries'
import { validRegistrationSchema } from '../../utils/schemas'

const Signup = props => {
  const { mutate } = props
  return (
    <React.Fragment>
      <h1 style={{ textAlign: 'center' }}>Signup</h1>
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
            <div className="button-group">
              <DefaultButton
                data-cy="signup-button"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                Submit
              </DefaultButton>
              <DefaultButton
                type="reset"
                className="secondary"
                disabled={!dirty || isSubmitting}
                onClick={handleReset}
              >
                Reset
              </DefaultButton>
              <Link to="/auth/login">
                <DefaultButton data-cy="login-button" type="button">
                  Login
                </DefaultButton>
              </Link>
            </div>
          </Form>
        )}
      />
    </React.Fragment>
  )
}

export default compose(
  graphql(REGISTER, {
    options: {
      refetchQueries: [{ query: VIEWER_ME }]
    }
  })
)(Signup)

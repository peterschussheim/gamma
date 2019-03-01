import * as React from 'react'
import { compose, graphql, Query } from 'react-apollo'
import { Formik, Form } from 'formik'

import { TextInput } from '../components/Form/Inputs'
import { RESEND_CONFIRMATION_EMAIL, VIEWER_ME } from '../queries'

const ConfirmEmail = props => {
  const { mutate } = props
  return (
    <Query query={VIEWER_ME}>
      {({ loading, error, data }) => {
        if (loading) {
          return 'Loading'
        }
        if (error) {
          return `Error: ${error}`
        }
        return (
          <React.Fragment>
            {data.viewer.me == null ? (
              <React.Fragment>
                <p>
                  Please check your email for a confirmation link or use the
                  form below to request a new confirm token.
                </p>
                <Formik
                  initialValues={{ email: '' }}
                  onSubmit={(values, actions) => {
                    mutate({ variables: values }).then(
                      () => {
                        actions.setSubmitting(false)
                        // reset form state
                      },
                      err => {
                        actions.setSubmitting(false)
                        const errors = err.graphQLErrors.map(e => e.message)
                        // @ts-ignore
                        actions.setErrors({ email: '', form: errors })
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
                    touched
                  }) => (
                    <Form>
                      // @ts-ignore
                      {errors.form ? (
                        // @ts-ignore
                        <div data-cy="form-error">{errors.form}</div>
                      ) : null}
                      // @ts-ignore
                      <TextInput
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="email@domain.tld"
                        error={touched.email && errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="email"
                        data-cy="email-input"
                      />
                      <button
                        data-cy="get-token-button"
                        type="submit"
                        disabled={!dirty || isSubmitting}
                      >
                        Request confirm token
                      </button>
                    </Form>
                  )}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>Email confirmed: {data.viewer.me.emailConfirmed}</p>
              </React.Fragment>
            )}
          </React.Fragment>
        )
      }}
    </Query>
  )
}

export default compose(
  graphql(RESEND_CONFIRMATION_EMAIL, {
    options: {
      refetchQueries: [{ query: VIEWER_ME }]
    }
  })
)(ConfirmEmail)

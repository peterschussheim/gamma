import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { Formik, Form } from 'formik'

import CodeEditor from '../components/editor'
import Skeleton from '../components/editor/skeleton'
import Footer from '../components/editor/footer'
import Sidebar from '../components/editor/sidebar'
import { DefaultButton, GreenButton } from '../components/buttons'

import { Input, TextArea } from '../components/form/inputs'
import { Debug } from '../components/form/formDebugger'

class NewGist extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          isPublic: true,
          description: '',
          files: [
            {
              filename: '',
              content: ''
            }
          ]
        }}
        onSubmit={this.handleSubmit}
        render={({
          values,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldValue,
          setFieldTouched
        }) => (
          <Form>
            <Skeleton sidebar={<Sidebar />}>
              <CodeEditor
                editorValue={values.files[0].content}
                onChange={handleChange}
              />
            </Skeleton>
            <Footer />
            <label style={{ justifySelf: 'right' }} htmlFor="description-input">
              Description
            </label>
            <Input
              id="description-input"
              placeholder="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
            />

            <React.Fragment>
              <label style={{ justifySelf: 'right' }} htmlFor="isPublic-input">
                Public
              </label>
              <Input
                id="isPublic-input"
                placeholder="isPublic"
                name="isPublic"
                type="checkbox"
                value={values.isPublic}
                onChange={handleChange}
              />
            </React.Fragment>
            <GreenButton
              type="submit"
              className="secondary"
              data-cy="new-public-gist"
              disabled={!dirty || isSubmitting}
            >
              Create Private Gist
            </GreenButton>
            <DefaultButton
              type="submit"
              className="secondary"
              data-cy="new-public-gist"
              disabled={!dirty || isSubmitting}
            >
              Create Public Gist
            </DefaultButton>
            <button
              type="reset"
              className="secondary"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Reset
            </button>
            <Debug />
          </Form>
        )}
      />
    )
  }
}

export default NewGist

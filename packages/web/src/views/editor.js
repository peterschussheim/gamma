import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Formik, Form } from 'formik'

import CodeEditor from '../components/editor'
import Skeleton from '../components/editor/skeleton'
import Header from '../components/editor/header'
import Sidebar from '../components/editor/sidebar'

import { Input, TextArea } from '../components/form/inputs'
import { Debug } from '../components/form/formDebugger'

class Editor extends React.Component {
  didLoad = () => {
    console.log('DidLoad')
  }

  didMount = editor => {
    console.log('DidMount', editor)
  }
  render() {
    return (
      <Formik
        initialValues={{
          visibility: 'PUBLIC',
          content: {
            name: '',
            data: ''
          }
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
              <CodeEditor theme="vs-dark" />
            </Skeleton>
            <Header title="neat" />
            {/* <label style={{ justifySelf: 'right' }} htmlFor="title-input">
              Title
            </label>
            <Input id="title-input" placeholder="Title" name="title" />
            <label style={{ justifySelf: 'right' }} htmlFor="tags-input">
              Tags
            </label>
            <Input id="tags-input" placeholder="tags" name="tags" /> */}
            <button
              type="submit"
              className="secondary"
              data-cy="submit-post"
              disabled={!dirty || isSubmitting}
            >
              Update
            </button>
            <button
              type="reset"
              className="secondary"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Reset
            </button>
            {/* <Debug /> */}
          </Form>
        )}
      />
    )
  }
}

export default Editor

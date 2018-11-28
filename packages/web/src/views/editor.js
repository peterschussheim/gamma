import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Formik, Form } from 'formik'

import CodeEditor from '../components/editor'
import Skeleton from '../components/editor/skeleton'
import Footer from '../components/editor/footer'
import Sidebar from '../components/editor/sidebar'

import { Input, TextArea } from '../components/form/inputs'
import { Debug } from '../components/form/formDebugger'

class Editor extends React.Component {
  state = {
    isEditing: false,
    isNewGist: false,
    editorValue: ''
  }

  render() {
    const { isNewGist, editorValue, isEditing } = this.state
    return (
      <Formik
        initialValues={{
          isNewGist,
          isPublic: true,
          description: '',
          gistId: null,
          files: [
            {
              filename: '',
              content: ''
            }
          ]
        }}
        onSubmit={this.handleSubmit}
        render={({
          isNewGist,
          editorValue,
          isEditing,
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
                value={values.files[0].content}
                onChange={handleChange}
                theme="vs-dark"
              />
            </Skeleton>
            <Footer />
          </Form>
        )}
      />
    )
  }
}

export default Editor

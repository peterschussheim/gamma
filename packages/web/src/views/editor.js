import React from 'react'
import { Formik, Form } from 'formik'

import Editor from '../components/editor/newEditor'
import Skeleton from '../components/skeleton'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'

class EditorView extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
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
        render={({ values, handleChange }) => (
          <Form>
            <React.Fragment>
              <Skeleton
                data={values}
                sidebar={<Sidebar />}
                editor={
                  <Editor
                    editorRef={editor => {
                      this.editor = editor
                    }}
                    value={values.files[0].content}
                    onChange={handleChange}
                  />
                }
              />
              <Footer />
            </React.Fragment>
          </Form>
        )}
      />
    )
  }
}

export default EditorView

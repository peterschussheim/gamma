import React from 'react'
import { Formik, Form } from 'formik'

// import MonacoEditor from '../components/MonacoEditor'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

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
                editor={<div>EditorView</div>}
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

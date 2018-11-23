import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Formik, Form } from 'formik'

import { GET_GIST_BY_ID } from '../queries'
import CodeEditor from '../components/editor'
import Skeleton from '../components/editor/skeleton'
import Header from '../components/editor/header'
import Sidebar from '../components/editor/sidebar'

class Editor extends React.Component {
  didLoad = () => {
    console.log('DidLoad')
  }

  didMount = editor => {
    console.log('DidMount', editor)
  }
  render() {
    return (
      <React.Fragment>
        <Skeleton sidebar={<Sidebar />}>
          <CodeEditor theme="vs-dark" />
        </Skeleton>
        <Header title="neat" />
      </React.Fragment>
    )
  }
}

export default Editor

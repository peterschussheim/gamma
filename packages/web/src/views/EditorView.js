import React from 'react'

// import MonacoEditor from '../components/MonacoEditor'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

class EditorView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Skeleton sidebar={<Sidebar />} editor={<div>EditorView</div>} />
        <Footer />
      </React.Fragment>
    )
  }
}

export default EditorView

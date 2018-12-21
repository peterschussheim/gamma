import * as React from 'react'

import MonacoEditor from '../components/MonacoEditor'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { Debugger } from '../components/Debugger'

class EditorView extends React.Component {
  handleValueChange = code => {
    console.log(code)
  }
  render() {
    return (
      <React.Fragment>
        <Skeleton
          sidebar={<Sidebar />}
          editor={<MonacoEditor handleValueChange={this.handleValueChange} />}
        />
        <Footer />
        <Debugger props={this.props} />
      </React.Fragment>
    )
  }
}

export default EditorView

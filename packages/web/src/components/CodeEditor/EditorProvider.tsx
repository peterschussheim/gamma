import * as React from 'react'

import { Annotation, FileSystemEntry, TextFileEntry } from './types'
import { updateEntry } from '../../actions'

export type Changes = Array<{ filename: string; content: string }>

export type State = {
  values: {
    gistId: string
    gistDescription: string
    currentFilename: string
    changes: Changes
    lintErrors: Annotation[]
  }
}

const initialState: State = {
  values: {
    gistId: '',
    gistDescription: '',
    currentFilename: '',
    changes: [],
    lintErrors: []
  }
}
const EditorContext = React.createContext(initialState)

class EditorProvider extends React.Component<{}, State> {
  state = initialState

  handleChange = (key: string, value: any) => {
    if (key === 'changes') {
      /**
       * 1) find the index of the currentFilename for the value being changed
       *    1.a) if it is found (this file exists in our changes obj), set the
       *         existing element's content property to `value`.
       *    1.b) if it is NOT found, set the `changes` property in state to
       *         `currentFilename` and `content`: value
       *
       */
      const existingFileIndex = this.state.values.changes.findIndex(
        file => file.filename === this.state.values.currentFilename
      )
      const changes = [...this.state.values.changes]
      if (existingFileIndex !== -1) {
        changes[existingFileIndex].content = value
        this.setState(prevState => ({
          values: {
            ...prevState.values,
            changes
          }
        }))
      } else {
        this.setState(prevState => ({
          values: {
            ...prevState.values,
            changes: [
              { filename: prevState.values.currentFilename, content: value },
              ...prevState.values.changes
            ]
          }
        }))
      }
    } else {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [key]: value
        }
      }))
    }
  }

  handleReset = () => {
    this.setState(initialState)
  }

  handleSave = () => {
    console.log('handleSave not yet implemented!')
  }

  render() {
    return (
      <EditorContext.Provider
        value={{
          change: this.handleChange,
          reset: this.handleReset,
          save: this.handleSave,
          values: this.state.values
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    )
  }
}

export { EditorContext, EditorProvider }

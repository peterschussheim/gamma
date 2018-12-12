import React from 'react'

const CodeEditorContext = React.createContext()

export class CodeEditorProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files,
      currentFile: 'App.js'
    }
  }

  handleValueChange = code =>
    this.setState(state => ({
      files: {
        ...state.files,
        [state.currentFile]: code
      }
    }))

  handleOpenPath = path => this.setState({ currentFile: path })

  getFilenameToDisplayInSidebar = path => {
    const split = path.split('/')
    const cleaned = split[split.length - 1]
    return cleaned
  }

  render() {
    const { children } = this.props

    return (
      <CodeEditorContext.Provider
        value={{
          handleValueChange: this.handleValueChange,
          handleOpenPath: this.handleOpenPath,
          getFilenameToDisplayInSidebar: this.getFilenameToDisplayInSidebar,
          files: this.state.files,
          currentFile: this.state.currentFile
        }}
      >
        {children}
      </CodeEditorContext.Provider>
    )
  }
}

export const CodeEditorContextConsumer = CodeEditorContext.Consumer

import * as React from 'react'

let EditorContext
const { Provider, Consumer } = (EditorContext = React.createContext())

class EditorProvider extends React.Component<{}, {}> {
  state = {
    currentFile: null,
    currentValue: null
  }
  handleOpenPath = path => {
    console.log('path', path)
  }

  handleValueChange = code =>
    this.setState(state => ({
      [state.currentValue]: code
    }))

  handleUpdateCurrentFile = path => {
    this.setState({ currentFile: path.filename, currentValue: path.content })
  }

  update = ({ key, value }) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          onSelectFile: this.handleUpdateCurrentFile,
          onValueChangle: this.handleValueChange,
          onOpenPath: this.handleOpenPath
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { EditorProvider, Consumer as EditorConsumer, EditorContext }

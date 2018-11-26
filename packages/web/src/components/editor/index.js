import React from 'react'
import MonacoEditor from 'react-monaco-editor'

export default class CodeEditor extends React.Component {
  state = {
    code: '// type your code... \n'
  }

  onChange = (newValue, e) => {
    // console.log('onChange', newValue, e) // eslint-disable-line no-console
  }

  editorDidMount = editor => {
    // console.log('editorDidMount', editor, editor.getValue(), editor.getModel())
    this.editor = editor
  }

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue('// code changed! \n')
    }
  }

  changeBySetState = () => {
    this.setState({ code: '// code changed by setState! \n' })
  }

  render() {
    const { value } = this.props
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
      minimap: { enabled: false }
    }
    const requireConfig = {
      url:
        'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'https://unpkg.com/monaco-editor@0.15.5/min/vs'
      }
    }
    return (
      <div>
        <MonacoEditor
          height="500"
          language={this.props.language}
          theme={this.props.theme}
          value={value}
          options={options}
          onChange={this.onChange}
          requireConfig={requireConfig}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}

import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import PropTypes from 'prop-types'

export default class CodeEditor extends React.Component {
  static propTypes = {
    editorValue: PropTypes.string.isRequired,
    editorLanguage: PropTypes.string,
    handleLoadFile: PropTypes.func.isRequired,
    handleEditorValueChange: PropTypes.func.isRequired
  }
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
    const { editorValue, editorLanguage } = this.props
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: this.props.readOnly,
      cursorStyle: 'line',
      automaticLayout: true,
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
          language={editorLanguage}
          theme="vs-dark"
          value={editorValue}
          options={options}
          onChange={this.onChange}
          requireConfig={requireConfig}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}

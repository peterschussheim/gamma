import * as monaco from '@peterschussheim/monaco-editor'
import PropTypes from 'prop-types'
import * as React from 'react'
import debounce from 'lodash/debounce'

function noop() {}

class MRE extends React.Component {
  constructor(props) {
    super(props)
    this.containerElement = React.createRef()
    this.iframeElement = React.createRef()
    this.__current_value = props.value
  }

  componentDidMount() {
    this.initMonaco()
    this.iframeElement.current.contentWindow.addEventListener(
      'resize',
      this.handleResize
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== this.__current_value) {
      // Always refer to the latest value
      this.__current_value = this.props.value
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.__prevent_trigger_change_event = true
        this.editor.setValue(this.__current_value)
        this.__prevent_trigger_change_event = false
      }
    }
    if (prevProps.language !== this.props.language) {
      monaco.editor.setModelLanguage(
        this.editor.getModel(),
        this.props.language
      )
    }
    if (prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme)
    }
    if (
      this.editor &&
      (this.props.width !== prevProps.width ||
        this.props.height !== prevProps.height)
    ) {
      this.editor.layout()
    }
    if (prevProps.options !== this.props.options) {
      this.editor.updateOptions(this.props.options)
    }
  }

  componentWillUnmount() {
    this.destroyMonaco()
    this.iframeElement &&
      this.iframeElement.current.contentWindow.removeEventListener(
        'resize',
        this.handleResize
      )
  }

  editorWillMount() {
    const { editorWillMount } = this.props
    const options = editorWillMount(monaco)
    return options || {}
  }

  editorDidMount(editor) {
    this.props.editorDidMount(editor, monaco)
    editor.onDidChangeModelContent(event => {
      const value = editor.getValue()

      // Always refer to the latest value
      this.__current_value = value

      // Only invoking when user input changed
      if (!this.__prevent_trigger_change_event) {
        this.props.onChange(value, event)
      }
    })
  }

  initMonaco() {
    const value =
      this.props.value !== null ? this.props.value : this.props.defaultValue
    const { language, theme, options } = this.props
    if (this.containerElement) {
      // Before initializing monaco editor
      Object.assign(options, this.editorWillMount())
      this.editor = monaco.editor.create(this.containerElement.current, {
        value,
        language,
        ...options
      })
      if (theme) {
        monaco.editor.setTheme(theme)
      }
      // After initializing monaco editor
      this.editorDidMount(this.editor)
    }
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
    }
  }

  handleResize = debounce(() => this.editor.layout(), 100, {
    leading: true,
    trailing: true
  })

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <iframe
          title="editor-iframe"
          ref={this.iframeElement}
          type="text/html"
          style={{
            display: 'block',
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
            pointerEvents: 'none',
            opacity: 0
          }}
        />
        <div
          ref={this.containerElement}
          className="react-monaco-editor-container"
        />
      </div>
    )
  }
}

MRE.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.object,
  editorDidMount: PropTypes.func,
  editorWillMount: PropTypes.func,
  onChange: PropTypes.func
}

MRE.defaultProps = {
  value: null,
  defaultValue: '',
  language: 'javascript',
  theme: null,
  options: {},
  editorDidMount: noop,
  editorWillMount: noop,
  onChange: noop
}

export default MRE

import React from 'react'
import PropTypes from 'prop-types'
import { createEditor } from '../../monaco/create'

const instances = window._monaco_instances || new Set()
function noop() {}

export default class Editor extends React.PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    language: PropTypes.string,
    theme: PropTypes.string,
    options: PropTypes.object,
    editorDidMount: PropTypes.func,
    editorWillMount: PropTypes.func,
    onDidChangeContent: PropTypes.func,
    editorRef: PropTypes.func,
    errors: PropTypes.array
  }

  static defaultProps = {
    width: '100%',
    height: '100%',
    value: null,
    defaultValue: '',
    language: 'javascript',
    options: {
      theme: 'vs-dark',
      automaticLayout: true,
      wordWrap: 'on',
      minimap: { enabled: false }
    },
    editorDidMount: noop,
    editorWillMount: noop,
    onDidChangeContent: noop,
    editorRef: () => {},
    errors: []
  }

  onDidChangeContent = (...rest) => {
    this.props.onDidChangeContent(this.model.setValue())
    // this.props.onDidChangeContent(this.model.getValue())
  }
  componentDidMount() {
    this.init()
    instances.add(this)
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.editor) {
      return
    }
    // if (prevProps.errorMarkers !== this.props.errorMarkers) {
    //   const { 0: error = [] } = this.props.errorMarkers || []
    //   setMarkers(this.editor, 'parser', error, error[2])
    // }
  }
  componentWillUnmount() {
    instances.delete(this)
    this.dispose()
    this.root.innerHTML = ''
  }
  init() {
    if (this.editor) {
      return
    }
    const opts = { value: this.props.value, ...this.props.options }
    this.editor = createEditor(this.root, opts)
    this.model = this.editor.getModel()
    this.subscription = this.model.onDidChangeContent(this.onDidChangeContent)
    this.props.editorRef(this.editor)
    this.onDidChangeContent()
  }
  dispose() {
    if (!this.editor) {
      return
    }
    this.editor.dispose()
    this.subscription.dispose()
    this.props.onDidChangeContent(null)
    this.editor = undefined
    this.model = undefined
    this.props.editorRef(undefined)
  }
  setRoot = ref => {
    this.root = ref
  }
  render() {
    // const { errorText } = this.props
    return <div className="sandbox" ref={this.setRoot} />
  }
}

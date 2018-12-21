import * as React from 'react'
// tslint:disable-next-line:no-implicit-dependencies
import debounce from 'lodash/debounce'
import { MonacoEditorNS } from '../../types'

export type BuiltinTheme = 'vs' | 'vs-dark' | 'hc-black'

export interface MonacoEditorProps {
  dependencies: {
    [name: string]: {
      version: string
    }
  }
  path: string
  value: string
  onOpenPath: (path: string) => void
  onValueChange: (value: string) => void
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
  scrollBeyondLastLine?: boolean
  minimap?: {
    enabled?: boolean
    maxColumn?: number
    renderCharacters?: boolean
    showSlider?: 'always' | 'mouseover'
    side?: 'right' | 'left'
  }
  readOnly?: boolean
  automaticLayout?: boolean
  autoFocus?: boolean
  fontFamily?: string
  fontLigatures?: boolean
  theme: BuiltinTheme
}

// tslint:disable-next-line:no-empty
function noop() {}

/**
 * Minimal component to be used as a BASE for adding advanced features.
 */
class MonacoEditor extends React.PureComponent<MonacoEditorProps, {}> {
  iframeElement: any
  containerElement: any
  subscription: any
  editor: any
  onDidChangeModel: any
  onDidChangeModelLanguage: any

  constructor(props: MonacoEditorProps) {
    super(props)
  }
  static defaultProps: MonacoEditorProps = {
    theme: 'hc-black',
    minimap: {
      enabled: false
    },
    readOnly: false,
    automaticLayout: true,
    editorDidMount: noop,
    editorWillMount: noop,
    onValueChange: noop
  }

  componentDidMount() {
    this.initMonaco()
    this.iframeElement.contentWindow.addEventListener(
      'resize',
      this.handleResize
    )
  }

  editorWillMount() {
    const { editorWillMount } = this.props
    const options = editorWillMount(monaco)
    return options || {}
  }

  editorDidMount = editor => {
    this.props.editorDidMount(editor, monaco)
  }

  initMonaco = () => {
    const { path, value, ...rest } = this.props
    // this.props.onOpenPath(path)

    if (this.containerElement) {
      Object.assign(rest, this.editorWillMount())
      this.editor = monaco.editor.create(this.containerElement, rest)

      this.onDidChangeModelLanguage = this.editor.onDidChangeModelLanguage(
        () => {
          console.log('changing model event fired')
        }
      )
      this.onDidChangeModel = this.editor.onDidChangeModel(() => {
        console.log('changing model event fired')
      })
      this.subscription = this.editor.onDidChangeModelContent(() => {
        // const newValue = this.editor.getModel().getValue()
        const newValue = this.editor.getModel()
        if (newValue !== this.props.value) {
          this.props.onValueChange(newValue)
        }
      })

      // this.openFile(path, value);
      // Object.keys(this.props.files).forEach(file => {
      //   console.log(file);
      //   if (
      //     file.type === 'file' &&
      //     file.path !== path &&
      //     typeof file.content === 'string'
      //   ) {
      //     this.initializeFile(file.path, file.content);
      //   }
      // });
      if (rest.theme) {
        monaco.editor.setTheme(rest.theme)
      }
      // After initializing monaco editor
      this.editorDidMount(this.editor)
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate: ', prevProps)
    const { path, value, language, onValueChange, ...options } = this.props
    console.log('options: ', options)
    console.log('language: ', language)
    const mergedOptions = { ...options, language }
    this.editor.updateOptions(mergedOptions)

    const model = this.editor.getModel()

    if (value !== model.getValue()) {
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: value
          }
        ]
      )
    }
  }

  destroyMonaco = () => {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
    }
  }

  componentWillUnmount() {
    this.destroyMonaco()
    if (this.iframeElement) {
      this.iframeElement.contentWindow.removeEventListener(
        'resize',
        this.handleResize
      )
    }
    if (this.onDidChangeModelLanguage) {
      this.onDidChangeModelLanguage.dispose()
    }
    if (this.onDidChangeModel) {
      this.onDidChangeModel.dispose()
    }
    if (this.subscription) {
      this.subscription.dispose()
    }
  }

  handleResize = debounce(() => this.editor.layout(), 100, {
    leading: true,
    trailing: true
  })

  getLanguage = (path: string) => {
    if (path.includes('.')) {
      switch (path.split('.').pop()) {
        case 'js':
          return 'javascript'
        case 'ts':
          return 'typescript'
        case 'json':
          return 'json'
        case 'css':
          return 'css'
        case 'html':
          return 'html'
        case 'md':
          return 'markdown'
        default:
          return undefined
      }
    }

    return undefined
  }

  assignContainerRef = component => {
    this.containerElement = component
  }

  assignIframeRef = component => {
    this.iframeElement = component
  }

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
          title="iframeElement"
          ref={this.assignIframeRef}
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
          ref={this.assignContainerRef}
          style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
          className={this.props.theme}
        />
      </div>
    )
  }
}

export default MonacoEditor

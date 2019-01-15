import * as React from 'react'
// import * as monaco from '@peterschussheim/monaco-editor'
// tslint:disable-next-line:no-implicit-dependencies
import debounce from 'lodash/debounce'

import { CreateEditorParameters, createEditor } from './monaco-utils/factories'

export type BuiltinTheme = 'vs' | 'vs-dark' | 'hc-black'

export interface MonacoEditorProps {
  dependencies: {
    [name: string]: {
      version: string
    }
  }
  path: string
  value: string
  language: string
  onOpenPath: (path: string) => void
  onValueChange: (value: string) => void
  editorDidMount: (editor: any) => void
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
class NewMonacoEditorComponent extends React.PureComponent {
  iframeElement: any
  containerElement: any

  static defaultProps = {
    theme: 'hc-black',
    options: {},
    editorDidMount: noop,
    editorWillMount: noop,
    onValueChange: noop,
    template: '',
    requireConfig: {},
    minimap: {
      enabled: false
    },
    readOnly: false,
    automaticLayout: true
  }

  componentDidMount() {
    this.afterViewInit()
  }

  componentWillUnmount() {
    this.destroyMonaco()
    if (this.iframeElement) {
      this.iframeElement.contentWindow.removeEventListener(
        'resize',
        this.handleResize
      )
    }

    if (this.subscription) {
      this.subscription.dispose()
    }
  }

  updateModel(newValue: string, originalValue: string) {
    const { language } = this.props
    const originalModel = monaco.editor.createModel(originalValue, language)
    const newModel = monaco.editor.createModel(newValue, language)
    this.editor.setModel({
      original: originalModel,
      modified: newModel
    })
  }

  editorWillMount = monaco => {
    const { editorWillMount } = this.props
    editorWillMount(monaco)
  }

  editorDidMount = (editor, monaco) => {
    this.props.editorDidMount(editor, monaco)
  }

  afterViewInit = () => {
    const context = this.props.context || window

    if (context.monaco !== undefined) {
      this.initMonaco()
      return
    }
  }
  // componentDidMount() {
  //   this.initMonaco()
  //   this.iframeElement.contentWindow.addEventListener(
  //     'resize',
  //     this.handleResize
  //   )
  // }

  initMonaco = () => {
    const { path, value, ...rest } = this.props
    // this.props.onOpenPath(path)

    if (this.containerElement) {
      Object.assign(rest, this.editorWillMount())
      // this.editor = monaco.editor.create(this.containerElement, rest)
      const createEditorArgs: CreateEditorParameters = {
        domElement: this.containerElement,
        options: rest
      }
      this.editor = createEditor(createEditorArgs).getEditor()

      this.subscription = this.editor.onDidChangeModelContent(() => {
        // const newValue = this.editor.getModel().getValue()
        const newValue = this.editor.getModel()
        if (newValue !== this.props.value) {
          this.props.onValueChange(newValue)
        }
      })

      if (rest.theme) {
        monaco.editor.setTheme(rest.theme)
      }
      // After initializing monaco editor
      this.editorDidMount(this.editor)
    }
  }

  destroyMonaco = () => {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
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
        ref={this.assignContainerRef}
        style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
        className={this.props.theme}
      />
    )
  }
}

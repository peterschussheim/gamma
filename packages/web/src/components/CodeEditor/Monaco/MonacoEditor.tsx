// tslint:disable:no-shadowed-variable

import * as React from 'react'
import * as monaco from '@peterschussheim/monaco-editor'

export type BuiltinTheme = 'vs' | 'vs-dark' | 'hc-black'
import { monaco as monacoEditor } from '../../../typings/monaco-editor'

export const findModel = (path: string) =>
  monaco.editor
    .getModels()
    .find((model: { uri: { path: string } }) => model.uri.path === `/${path}`)

export interface MonacoEditorComponentProps {
  onOpenPath?: (path: string) => void
  onValueChange: (value: string) => void
  editorWillMount?: (editor: any) => void
  editorDidMount?: (
    editor: any,
    monaco: monacoEditor.editor.ICodeEditor
  ) => void
  getEditorOptions?: () => void
  diffEditor?: boolean
  context?: any
  height?: string | number
  width?: string | number
  dependencies?: {
    [name: string]: {
      version: string
    }
  }
  path?: string
  value?: string
  language?: string
  options: {
    lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
    wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
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
    theme?: BuiltinTheme | string
  }
  requireConfig?: any
}

// tslint:disable-next-line:no-empty
function noop() {}

/**
 * Minimal component to be used as a BASE for adding advanced features.
 */
export default class MonacoEditorComponent extends React.PureComponent<
  MonacoEditorComponentProps
> {
  containerElement: React.ReactNode
  editor: any

  static defaultProps: Partial<MonacoEditorComponentProps> = {
    width: '100%',
    height: '100%',
    options: {
      minimap: {
        enabled: false
      },
      readOnly: false
    },
    editorDidMount: noop,
    editorWillMount: noop,
    onValueChange: noop,
    requireConfig: {}
  }

  componentDidMount() {
    this.afterViewInit()
  }

  afterViewInit = () => {
    const context = this.props.context || window

    if (context.monaco !== undefined) {
      this.initMonaco()
      return
    }
  }

  /**
   * Initializes a single instance of monaco.editor.ICodeEditor to be used
   * by parent component `CodeEditor` when creating models, etc.
   */
  initMonaco = () => {
    const { options, diffEditor = false, ...rest } = this.props
    const context = this.props.context || window

    if (this.containerElement && typeof context.monaco !== 'undefined') {
      const appliedOptions = { ...options }

      if (this.editor && this.props.getEditorOptions) {
        this.editor.updateOptions(this.props.getEditorOptions())
      }

      this.editor = context.monaco.editor[
        diffEditor ? 'createDiffEditor' : 'create'
      ](this.containerElement, appliedOptions)

      if (options.theme) {
        monaco.editor.setTheme(options.theme)
      }
      // After initializing monaco editor
      this.editorDidMount(this.editor, context.monaco)
    }
  }

  /**
   * Any event fired BEFORE the editor mounts. Do something before the editor
   * instance loads, ex: set language defaults, etc.
   */
  editorWillMount = (monaco: any) => {
    const { editorWillMount } = this.props
    editorWillMount(monaco)
  }

  /**
   * Called AFTER initializing an instance of `monaco.editor`.
   * Use this method to interact with the editor instance and/or
   * the raw monaco namespace.
   */
  editorDidMount = (editor: any, monaco: monacoEditor.editor.ICodeEditor) => {
    this.props.editorDidMount(editor, monaco)
  }

  componentWillUnmount() {
    this.destroyMonaco()
  }

  destroyMonaco = () => {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
    }
  }

  assignRef = (component: React.ReactNode) => {
    this.containerElement = component
  }

  render() {
    const { width, height } = this.props
    const fixedWidth =
      width.toString().indexOf('%') !== -1 ? width : `${width}px`
    const fixedHeight =
      height.toString().indexOf('%') !== -1 ? height : `${height}px`
    const style: React.CSSProperties = {
      width: fixedWidth,
      height: fixedHeight,
      overflow: 'hidden',
      position: 'absolute'
    }

    return (
      <div
        ref={this.assignRef}
        style={style}
        className="react-monaco-editor-container"
      />
    )
  }
}

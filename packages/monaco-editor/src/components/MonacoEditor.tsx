import * as React from 'react'
import { throttle } from 'lodash-es'

export interface IMonacoEditorProps
  extends monaco.editor.IEditorConstructionOptions {
  value: string
  tabSize?: number
  pathToMonaco?: string
  onChange?: (
    event: monaco.editor.IModelContentChangedEvent,
    editor: monaco.editor.ICodeEditor,
  ) => void
  editorWillMount?: (code: typeof monaco) => void
  editorDidMount?: (
    editor: monaco.editor.ICodeEditor,
    code: typeof monaco,
  ) => void
}

export function loadMonaco(pathToMonaco: string): Promise<typeof monaco> {
  return new Promise((resolve, reject) => {
    const ctx: any = window

    if (ctx.monaco) {
      return resolve(ctx.monaco)
    }

    if (ctx.require) {
      ctx.require.config({
        paths: { vs: pathToMonaco },
      })

      ctx.require(['vs/editor/editor.main'], () => {
        resolve(ctx.monaco)
      })

      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `${pathToMonaco}/loader.js`
    script.onload = () =>
      loadMonaco(pathToMonaco)
        .then(resolve)
        .catch(reject)
    script.onerror = event => reject(event.error)
    document.head.appendChild(script)
  })
}

export class MonacoEditor extends React.Component<IMonacoEditorProps> {
  public static defaultProps = {
    pathToMonaco: 'vs',
    tabSize: 2,
    editorDidMount: () => {},
    editorWillMount: () => {},
  }

  public editor: monaco.editor.ICodeEditor
  public el: HTMLDivElement
  public didMount = false

  constructor(props: IMonacoEditorProps) {
    super(props)

    this.onElementAvailable = this.onElementAvailable.bind(this)
    this.onEditorModelContentChange = this.onEditorModelContentChange.bind(this)
    this.onWindowResize = throttle(this.onWindowResize.bind(this), 80)
  }

  componentWillMount() {
    if (this.editor) {
      this.editor.dispose()
    }
  }

  componentDidMount() {
    this.didMount = true
    this.initEditorIfPossibleAndNecessary()
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.dispose()
      delete this.editor
    }

    window.removeEventListener('resize', this.onWindowResize)
  }

  shouldComponentUpdate(nextProps: IMonacoEditorProps) {
    for (let key in nextProps) {
      if (key === 'value') continue
      if (
        nextProps[key as keyof IMonacoEditorProps] !==
        this.props[key as keyof IMonacoEditorProps]
      ) {
        return true
      }
    }

    return false
  }

  componentWillReceiveProps(nextProps: IMonacoEditorProps) {
    if (
      nextProps.language !== this.props.language ||
      nextProps.tabSize !== this.props.tabSize
    ) {
      this.updateModelFromProps(nextProps)
    }
  }

  updateModelFromProps(props: IMonacoEditorProps) {
    const model = monaco.editor.createModel(props.value, props.language)
    model.updateOptions(props)
    this.editor.setModel(model)
  }

  async initEditorIfPossibleAndNecessary(props?: IMonacoEditorProps) {
    if (this.editor || !this.el || !this.didMount) {
      return
    }

    try {
      const monaco = await loadMonaco(this.props.pathToMonaco)
      this.props.editorWillMount(monaco)
      this.editor = monaco.editor.create(this.el, this.getEditorOptions(props))
      this.editor.onDidChangeModelContent(this.onEditorModelContentChange)
      this.updateModelFromProps(props || this.props)
      setTimeout(() => this.props.editorDidMount(this.editor, monaco), 1)
      return this.editor
    } catch (e) {
      console.error(e)
    }
  }

  getEditorOptions(
    props?: IMonacoEditorProps,
  ): monaco.editor.IEditorConstructionOptions {
    const result = Object.assign({}, this.props, props || {})
    return result
  }

  render() {
    return (
      <div
        ref={this.onElementAvailable}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      />
    )
  }

  relayoutEditor() {
    return new Promise(resolve => {
      // Seems to be flaky behavior with re-laying out the editor
      // when the container size changes. This makes it more consistent
      this.el.style.position = 'static'

      setTimeout(() => {
        this.el.style.position = 'absolute'

        setTimeout(() => {
          if (this.editor) {
            this.editor.layout()
          }

          resolve()
        }, 4)
      }, 4)
    })
  }

  onElementAvailable(el: HTMLDivElement) {
    this.el = el
    this.initEditorIfPossibleAndNecessary()
  }

  onEditorModelContentChange(event: monaco.editor.IModelContentChangedEvent) {
    if (this.props.onChange) {
      this.props.onChange(event, this.editor)
    }
  }

  onWindowResize() {
    if (this.editor) {
      this.relayoutEditor()
    }
  }
}

import * as React from 'react'
import { createComponent } from 'cf-style-container'
import { MonacoEditor } from './MonacoEditor'
import { types as editorCustomTypesString } from '../types/editor'

export interface IWrappedEditorProps {
  value: string
  editorDidMount?: (
    editor: monaco.editor.ICodeEditor,
    code: typeof monaco,
  ) => void
}

export interface IWrappedEditorState {}

export class WrappedEditor extends React.Component<
  IWrappedEditorProps,
  IWrappedEditorState
> {
  public static defaultProps = {
    value: '',
  }

  constructor(props: IWrappedEditorProps) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.editorDidMount = this.editorDidMount.bind(this)
    this.editorWillMount = this.editorWillMount.bind(this)
  }

  editorWillMount(code: typeof monaco) {
    code.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      editorCustomTypesString,
      'extended-events.d.ts',
    )
  }

  editorDidMount(editor: monaco.editor.ICodeEditor, code: typeof monaco) {
    editor.focus()

    if (typeof this.props.editorDidMount === 'function') {
      this.props.editorDidMount(editor, code)
    }
  }

  onChange(
    event: monaco.editor.IModelContentChangedEvent,
    editor: monaco.editor.ICodeEditor,
  ) {}

  render() {
    return (
      <EditorWrapper>
        <MonacoEditor
          value={this.props.value}
          pathToMonaco="/ui/vs"
          selectOnLineNumbers={true}
          language="javascript"
          minimap={{ enabled: false }}
          folding={true}
          onChange={this.onChange}
          editorWillMount={this.editorWillMount}
          editorDidMount={this.editorDidMount}
        />
      </EditorWrapper>
    )
  }
}

const EditorWrapper = createComponent(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  width: '100%',
  height: '100%',
}))

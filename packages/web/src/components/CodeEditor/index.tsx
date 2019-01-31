// tslint:disable:jsx-no-multiline-js
import * as React from 'react'

import MonacoEditor from './Monaco'

import { MonacoEditorProps, Gist } from './types'

// interface CodeEditorProps {
//   editorWillMount?: (editor: any) => void
//   editorDidMount?: (editor: any, monaco: any) => void
//   onOpenPath: (path: string) => void
//   onValueChange: (value: string) => void
//   onSave?: (code: string) => void
//   dependencies?: any
//   gist: Gist
//   currentFile?: any
//   currentFilename: string
//   value: string
//   options?: any
//   modelOptions?: any
//   height?: number
//   width?: number
//   autoFocus?: boolean
//   children?: React.ReactNode
// }

export default class CodeEditor extends React.PureComponent<MonacoEditorProps> {
  render() {
    const props: MonacoEditorProps = this.props

    // TODO: build an object to be passed to `MonacoEditor` below
    // containing the modified files with their hash

    return (
      <MonacoEditor
        editorDidMount={props.editorDidMount}
        onValueChange={props.onValueChange}
        value={props.value}
        entries={props.entries}
        path={props.path}
        gist={props.gist}
        dependencies={props.dependencies}
        options={props.options}
        modelOptions={props.modelOptions}
        autoFocus={true}
        {...props}
      />
    )
  }
}

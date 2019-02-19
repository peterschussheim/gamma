// tslint:disable:jsx-no-multiline-js
import * as React from 'react'

import MonacoEditor from './Monaco'

import { MonacoEditorProps, Gist } from './types'
import { Container, CodeContainer } from './Monaco/elements'

export default class CodeEditor extends React.PureComponent<MonacoEditorProps> {
  editorDidMount = editor => {
    this.editor = editor
  }
  render() {
    const props: MonacoEditorProps = this.props
    return (
      <Container>
        <MonacoEditor
          editorDidMount={this.editorDidMount}
          onValueChange={props.onValueChange}
          value={props.value}
          entries={props.entries}
          path={props.path}
          dependencies={props.dependencies}
          options={props.options}
          modelOptions={props.modelOptions}
          autoFocus={true}
          {...props}
        />
      </Container>
    )
  }
}

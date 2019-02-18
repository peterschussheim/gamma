import * as React from 'react'
import { EditorContext, State } from './EditorProvider'

export default function withEditorContext<Props extends State>(
  Child: React.ComponentType<Props>
) {
  return (props: Props) => (
    <EditorContext.Consumer>
      {contextState => <Child {...props} {...contextState} />}
    </EditorContext.Consumer>
  )
}

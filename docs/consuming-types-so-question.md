## How to consume an existing `.d.ts` file? 

### Overview

I am working on an application that uses [monaco-editor](https://github.com/Microsoft/monaco-editor) and would like to understand how I can 
'reuse' the original declarations, [monaco.d.ts](https://github.com/Microsoft/monaco-editor/blob/master/monaco.d.ts).

Example usage:

```typescript
import * as monaco from 'monaco-editor'

export const createEditor = (editorParams) => {
  const { domElement, options, override } = editorParams

  // the annotation below to var `editor` should be bound to a local copy
  // of `monaco.d.ts`, located in project root.
  const editor: monaco.editor.IStandaloneCodeEditor = monaco.editor.create(
    domElement,
    { model: null }
  )

  function getEditor() {
    return editor
  }

  function dispose() {
    return editor.dispose()
  }

  return Object.freeze({
    getEditor,
    dispose
  })
}
```

import * as React from 'react'

// tslint:disable:no-empty
export const EditorContext = React.createContext({
  files: [
    {
      filename: '',
      content: ''
    }
  ],
  currentFile: null,
  handleValueChange: () => {},
  handleOpenPath: () => {}
})

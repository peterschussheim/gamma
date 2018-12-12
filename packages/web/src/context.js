import React from 'react'

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

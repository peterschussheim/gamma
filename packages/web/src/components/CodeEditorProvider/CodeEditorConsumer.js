import React from 'react'
import { CodeEditorContextConsumer } from './CodeEditorProvider'

export const SharedCodeEditor = () => (
  <CodeEditorContextConsumer>
    {({
      handleValueChange,
      handleOpenPath,
      getFilenameToDisplayInSidebar,
      files,
      currentFile
    }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarIsOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={[
          <IconButton key="close" color="inherit" onClick={closeSnackbar}>
            <Close />
          </IconButton>
        ]}
      />
    )}
  </CodeEditorContextConsumer>
)

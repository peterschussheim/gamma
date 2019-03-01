import * as React from 'react'

import { DefaultButton } from './Buttons'

export const NewGist = ({ onClick, ...props }) => {
  return (
    <DefaultButton
      type="button"
      text="New"
      data-cy="new-button"
      onClick={onClick}
      {...props}
    >
      New
    </DefaultButton>
  )
}

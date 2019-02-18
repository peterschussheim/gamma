import * as React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_GIST } from '../queries'
import { DefaultButton } from './Buttons'

// NOTE: currently not in use
export const New = props => {
  return (
    // @ts-ignore
    <Mutation mutation={CREATE_GIST}>
      {(mutate, loading, error) => (
        <DefaultButton
          text="New"
          data-cy="new-button"
          onClick={async () => {
            await mutate({ variables: { gistId: props.gistId } })
          }}
        >
          New
        </DefaultButton>
      )}
    </Mutation>
  )
}

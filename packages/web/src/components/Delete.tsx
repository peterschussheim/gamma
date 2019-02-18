import * as React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_GIST } from '../queries'
import { RedButton } from './Buttons'

const Delete = props => {
  return (
    // @ts-ignore
    <Mutation mutation={DELETE_GIST}>
      {(deleteGist, loading, error) => (
        <RedButton
          text="Delete"
          data-cy="delete-button"
          onClick={async () => {
            await deleteGist({ variables: { gistId: props.gistId } })
            props.history.push('/editor')
          }}
        />
      )}
    </Mutation>
  )
}

export default Delete

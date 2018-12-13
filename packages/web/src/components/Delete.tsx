import * as React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_GIST } from '../queries'
import { RedButton } from './Buttons'

const Delete = props => {
  return (
    <Mutation mutation={DELETE_GIST}>
      {(deleteGist, loading, error) => (
        <RedButton
          data-cy="delete-button"
          onClick={async () => {
            await deleteGist({ variables: { gistId: props.gistId } })
            props.history.push('/editor')
          }}
        >
          Delete
        </RedButton>
      )}
    </Mutation>
  )
}

export default Delete

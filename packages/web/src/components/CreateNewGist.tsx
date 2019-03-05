import * as React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_GIST, GET_GIST_BY_ID } from '../queries'
import { GreenButton } from './Buttons'
import {
  CreateGist,
  CreateGist_createGist,
  GistCreateInput
} from '../__generated__/types'

/**
 * Setting a file's `content` property to null will instruct
 * GitHub API to delete that file.
 */
type Content = string | null
type Files = Array<{ filename: string; content: Content }>

type Props = {
  dirty: boolean
  gistId: string
  description: string
  files: Files
  onSaveCompleted: (data: Partial<CreateGist_createGist>) => void
}

type Data = CreateGist_createGist
type Variables = { data: GistCreateInput }

class CreateGistMutation extends Mutation<Data, Variables> {}

export const CreateNewGist: React.FunctionComponent<Props> = props => {
  return (
    <CreateGistMutation
      mutation={CREATE_GIST}
      onCompleted={data => {
        props.onSaveCompleted(data && data.updateGist)
        props.history.push(`/g/${data.createGist.gistId}`)
      }}
    >
      {(createGist, { data, loading, error }) => {
        return (
          <GreenButton
            disabled={!props.dirty}
            data-cy="save-button"
            onClick={async e => {
              e.preventDefault()
              const { description } = props
              const files = props.files()
              await createGist({
                variables: {
                  data: {
                    isPublic: true,
                    description,
                    files
                  }
                }
              })
            }}
          >
            {loading ? 'Loading' : 'Save Changes'}
          </GreenButton>
        )
      }}
    </CreateGistMutation>
  )
}

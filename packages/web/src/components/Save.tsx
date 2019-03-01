import * as React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_GIST, EDIT_GIST, GET_GIST_BY_ID } from '../queries'
import { GreenButton } from './Buttons'
import { UpdateGist, GistUpdateInput } from '../__generated__/types'

/**
 * Setting a file's `content` property to null will instruct
 * GitHub API to delete that file.
 */
type Content = string | null
type Files = Array<{ filename: string; content: Content }>
interface Payload {
  /** Optional since we won't have an ID when creating a new files */
  gistId?: string
  description: string
  files: Files
}

type Props = {
  dirty: boolean
  gistId: string
  description: string
  files: Files
  onSaveCompleted: (data: Partial<UpdateGist>) => void
}

type Data = UpdateGist
type Variables = { data: GistUpdateInput }

class EditGistMutation extends Mutation<Data, Variables> {}

// TODO: refactor the incoming props, specifically the files.
// most likely we need to convert the 'FileEntry' type back into the shape
// our graphql endpoint expects.
export const Save: React.FunctionComponent<Props> = props => {
  return (
    <EditGistMutation
      mutation={EDIT_GIST}
      awaitRefetchQueries={true}
      refetchQueries={[
        { query: GET_GIST_BY_ID, variables: { gistId: props.gistId } }
      ]}
      onCompleted={data => {
        // tslint:disable-next-line: no-unused-expression
        data && data.updateGist && props.onSaveCompleted(data.updateGist)
      }}
    >
      {(updateGist, { data, loading, error }) => {
        return (
          <GreenButton
            disabled={!props.dirty}
            data-cy="save-button"
            onClick={async e => {
              e.preventDefault()
              const { gistId, description } = props
              const files = props.files()
              await updateGist({
                variables: {
                  data: {
                    gistId,
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
    </EditGistMutation>
  )
}

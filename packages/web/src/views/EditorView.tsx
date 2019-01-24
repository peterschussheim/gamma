import * as React from 'react'

import { Query } from 'react-apollo'
import { RouteComponentProps, match } from 'react-router-dom'
import { VIEWER_GISTS, GET_GIST_BY_ID } from '../queries'

import CodeEditor from '../components/CodeEditor'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import GistList from '../components/SidebarList/GistList'
import { Icon } from '../components/icon'
import { UserBtnsContainer, BlueButton } from '../components/Buttons'
import { Save } from '../components/Save'
import Delete from '../components/Delete'
import GistFilesList from '../components/SidebarList/GistFilesList'
import {
  EditorContext,
  EditorStore
} from '../components/CodeEditor/EditorProvider'

import { GetGistById } from '../__generated__/types'
import {
  DependencyList,
  Gist,
  FileSystemEntry
} from '../components/CodeEditor/types'
import { isFileDirty } from '../utils/isGistDirty'

const defaultOptions = {
  fontSize: 12,
  automaticLayout: true,
  colorDecorators: true
}

interface MatchParams {
  gistId: string
}

interface EditorViewProps extends RouteComponentProps<MatchParams> {
  handleOpenPath: (path: string) => void
  handleValueChange?: (value: string) => void
  gist: Gist
  entries: FileSystemEntry[]
  entry: FileSystemEntry
  path?: string
  currentFilename: string
  value?: string
  dependencies?: DependencyList
  children?: React.ReactNode
  options?: any
  modelOptions?: any
}

const dependencies = {
  react: '16.3.1'
}

const buildEntriesFromGist = (gist: Gist): FileSystemEntry[] => {
  const fileSystemArray = []

  gist.files.forEach(file => {
    fileSystemArray.push({
      item: {
        path: file.filename,
        content: gist.gistId,
        gistDescription: gist.description,
        type: 'gist'
      },
      state: {}
    })
  })

  return fileSystemArray
}

type Data = GetGistById

interface Variables {
  gistId: string
}

class GistById extends Query<Data, Variables> {}

class EditorView extends React.Component<EditorViewProps, {}> {
  static defaultProps = {
    dependencies
  }
  static contextType = EditorContext

  render() {
    const props = this.props
    // tslint:disable-next-line:no-shadowed-variable
    const { match, history } = props

    const context = this.context

    if (match.path === '/editor') {
      return renderViewForAllGists({ context })
    } else if (match.path === '/g/:gistId') {
      const { params } = match

      return renderViewForMatchedGist({ context, params, history })
    } else {
      return null
    }
  }
}

const renderViewForAllGists: React.FunctionComponent<{
  context: EditorStore
  match?: match
  history?: any
}> = ({ context }) => {
  return (
    <React.Fragment>
      <Skeleton sidebar={<GistList />} editor={<div>no gist selected</div>} />
      <Footer
        currentFile={context.currentFilename}
        iconComponent={<Icon height={17} filename={context.currentFilename} />}
      />
    </React.Fragment>
  )
}

/**
 * ex:  `gamma.app/g/7c69d47b17ad50a4c70c3b17b9dc5869`
 * this should render that `gistId` complete with an editor instance.
 */
const renderViewForMatchedGist: React.FunctionComponent<{
  context: EditorStore
  params: MatchParams
  history: any
}> = props => {
  // tslint:disable-next-line:no-shadowed-variable
  const { context, params, history } = props
  const { gistId } = params
  return (
    <GistById query={GET_GIST_BY_ID} variables={{ gistId }}>
      {({ loading, error, data }) => {
        if (loading) {
          return null
        }
        if (error) {
          return `Error!: ${error}`
        } else if (!loading && data && data.getGistById) {
          const currentFilename =
            context.currentFilename == null
              ? data.getGistById.files[0].filename
              : context.currentFilename

          const value = data.getGistById.files.find(
            gist => gist.filename === currentFilename
          )

          const dirty = data.getGistById.files
            .map(file => {
              return isFileDirty(context.changes, file)
            })
            .some(element => element === true)

          const files = !dirty
            ? null
            : Object.entries(context.changes).map(file => ({
                filename: file[0],
                content: file[1]
              }))

          // TODO: why do we need to do this transform?
          const entries = buildEntriesFromGist(data.getGistById)

          return (
            <React.Fragment>
              <h1>Viewing Gist: {gistId}</h1>
              <UserBtnsContainer>
                <BlueButton onClick={() => history.push('/editor')}>
                  Back
                </BlueButton>
                <Delete gistId={gistId} history={history} />

                <Save
                  dirty={dirty}
                  gistId={gistId}
                  description={data.getGistById.description}
                  changedFiles={files}
                  handleResetChanges={context.handleResetChanges}
                />
              </UserBtnsContainer>
              <React.Fragment>
                <Skeleton
                  sidebar={
                    <GistFilesList
                      loading={loading}
                      data={data}
                      handleResetStore={context.handleResetStore}
                      handleOpenPath={context.handleOpenPath}
                      changes={context.changes}
                    />
                  }
                  editor={
                    value !== undefined ? (
                      <CodeEditor
                        onOpenPath={context.handleOpenPath}
                        onValueChange={context.handleValueChange}
                        path={currentFilename}
                        value={
                          context.changes == null ||
                          context.changes[currentFilename] == null
                            ? value.content
                            : context.changes[context.currentFilename]
                        }
                        gist={data.getGistById}
                        entries={entries}
                        options={defaultOptions}
                        modelOptions={{ tabSize: 2 }}
                      />
                    ) : null
                  }
                />
                <Footer
                  currentFile={context.currentFilename}
                  iconComponent={
                    <Icon height={17} filename={context.currentFilename} />
                  }
                />
              </React.Fragment>
            </React.Fragment>
          )
        } else {
          return null
        }
      }}
    </GistById>
  )
}

export default EditorView

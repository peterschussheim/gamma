import * as React from 'react'

import { Query } from 'react-apollo'
import { RouteComponentProps, match } from 'react-router-dom'

import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import GistList from '../components/SidebarList/GistList'
import { Icon } from '../components/icon'
import { UserBtnsContainer, BlueButton } from '../components/Buttons'

import { EditorContext } from '../components/CodeEditor/EditorProvider'

import { GetGistById } from '../__generated__/types'
import {
  DependencyList,
  Gist,
  FileSystemEntry
} from '../components/CodeEditor/types'
import { NewGist } from '../components/NewGist'

export const buildEntriesFromGist = (gist: Gist): FileSystemEntry[] => {
  const fileSystemArray = []

  gist.files.forEach(file => {
    fileSystemArray.push({
      item: {
        gistId: gist.gistId,
        path: file.filename,
        content: file.content,
        gistDescription: gist.description,
        type: 'gist'
      },
      state: {}
    })
  })

  return fileSystemArray
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

class EditorView extends React.Component<EditorViewProps, null> {
  constructor(props) {
    super(props)
  }
  static contextType = EditorContext

  render() {
    const props = this.props
    // tslint:disable-next-line:no-shadowed-variable
    const { match, history } = props
    const context = this.context

    if (match.path === '/editor') {
      return renderViewForAllGists({
        context,
        history
      })
    } else {
      return null
    }
  }
}

interface ViewProps {
  context: any
  match?: match
  history?: any
  params?: MatchParams
}

/**
 * TODO
 *
 * 1) Need to lift the source of the 'defaultTemplate' data so it is the same
 *   shape as the apollo query.
 *
 *  2) consider creating separate components that CORRESPOND to
 * the `editorState` object
 *
 *  3) create a mechanism to 'addFile' so users can add additional files
 *   as needed when `creating` or `editing` a gist.
 *
 *  4) fix editor styling, eg: full screen, skeleton
 *
 */

const renderViewForAllGists: React.FunctionComponent<ViewProps> = ({
  context,
  history
}) => {
  return (
    <React.Fragment>
      <UserBtnsContainer>
        <BlueButton onClick={() => history.push('/')}>Back</BlueButton>
        <NewGist onClick={() => history.push('/new')} />
      </UserBtnsContainer>
      <Skeleton
        sidebar={<GistList />}
        editor={<div style={{ height: '100%', backgroundColor: '#242424' }} />}
      />
      <Footer
        currentFile={context.values.currentFilename}
        iconComponent={
          <Icon height={17} filename={context.values.currentFilename} />
        }
      />
    </React.Fragment>
  )
}

export default EditorView

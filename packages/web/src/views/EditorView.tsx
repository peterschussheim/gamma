// tslint:disable:no-unused-expression

import * as React from 'react'

import { RouteComponentProps } from 'react-router-dom'

import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import NoFileSelected from '../components/NoFileSelected'
import GistList from '../components/SidebarList/GistList'
import { Icon } from '../components/Icon'
import { UserBtnsContainer, BlueButton } from '../components/Buttons'
import { NewGist } from '../components/NewGist'

import { EditorContext } from '../components/CodeEditor/EditorProvider'

import { openEntry } from '../actions'
// import lintEntry from '../utils/lintEntry'
import { isInsideFolder, changeParentPath } from '../utils/fileUtilities'
import {
  DependencyList,
  FileSystemEntry,
  TextFileEntry,
  SaveStatus,
  Annotation
} from '../components/CodeEditor/types'

interface MatchParams {
  gistId: string
}

interface EditorViewProps extends RouteComponentProps<MatchParams> {
  // handleOpenPath: (path: string) => void
  // handleValueChange?: (value: string) => void
  onFileEntriesChange: (entries: FileSystemEntry[]) => Promise<void>
  onChangeCode: (code: string) => void
  entries: FileSystemEntry[]
  entry: FileSystemEntry
  saveStatus: SaveStatus
  path?: string
  currentFilename: string
  value?: string
  dependencies?: DependencyList
  children?: React.ReactNode
  options?: any
  modelOptions?: any
}

interface EditorViewState {
  lintErrors: Annotation[]
  previousEntry: TextFileEntry | undefined
}

export default class EditorView extends React.Component<
  EditorViewProps,
  EditorViewState
> {
  constructor(props) {
    super(props)
    this.state = {
      lintErrors: [],
      previousEntry: undefined
    }
  }
  static getDerivedStateFromProps(
    props: EditorViewProps,
    state: EditorViewState
  ) {
    if (props.entry !== state.previousEntry) {
      const { entry } = props
      const { previousEntry } = state

      return {
        previousEntry: entry
      }
    }

    return null
  }
  static contextType = EditorContext
  EditorComponent: any

  componentDidUpdate(prevProps: EditorViewProps) {
    if (this.props.entry !== prevProps.entry) {
      // this.lint(this.props.entry)
    }
  }

  handleOpenPath = (path: string): Promise<void> =>
    this.props.onFileEntriesChange(openEntry(this.props.entries, path, true))

  handleRemoveFile = (path: string) => {
    const entry = this.props.entries.find(({ item }) => item.path === path)

    if (entry && entry.item.type === 'folder') {
      this.props.entries.forEach(({ item }) => {
        if (isInsideFolder(item.path, path)) {
          this.EditorComponent && this.EditorComponent.removePath(item.path)
        }
      })
    } else {
      this.EditorComponent && this.EditorComponent.removePath(path)
    }
  }

  handleRenameFile = (oldPath: string, newPath: string) => {
    const entry = this.props.entries.find(({ item }) => item.path === oldPath)

    if (entry && entry.item.type === 'folder') {
      this.props.entries.forEach(({ item }) => {
        if (isInsideFolder(item.path, oldPath)) {
          const renamedPath = changeParentPath(item.path, oldPath, newPath)

          this.EditorComponent &&
            this.EditorComponent.renamePath(item.path, renamedPath)
        }
      })
    } else {
      this.EditorComponent && this.EditorComponent.renamePath(oldPath, newPath)
    }
  }

  // lintNotDebounced = async (entry: FileSystemEntry | undefined) => {
  //   const lintErrors = await lintEntry(entry, this.props.entries)

  //   if (!lintErrors.length && !this.state.lintErrors.length) {
  //     // There are no lint errors and nothing to clear
  //     return
  //   }

  //   this.setState({ lintErrors })
  // }

  // lint = debounce(this.lintNotDebounced, 500)

  render() {
    const { entry, entries, history } = this.props
    const { lintErrors, previousEntry } = this.state
    const context = this.context
    const annotations: Annotation[] = []

    annotations.push(...lintErrors)

    return (
      <React.Fragment>
        <UserBtnsContainer>
          <BlueButton onClick={() => history.push('/')}>Back</BlueButton>
          <NewGist onClick={() => history.push('/new')} />
        </UserBtnsContainer>
        <Skeleton
          sidebar={<GistList data={this.props.data} />}
          editor={<NoFileSelected />}
          footer={<Footer />}
        />
      </React.Fragment>
    )
  }
}

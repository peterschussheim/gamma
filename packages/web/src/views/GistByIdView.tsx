// tslint:disable:max-line-length

import * as React from 'react'

import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import { Icon } from '../components/Icon'
import { UserBtnsContainer, BlueButton } from '../components/Buttons'
import { Save } from '../components/Save'
import Delete from '../components/Delete'
import FileList from '../components/SidebarList/FileList'
import { EditorContext } from '../components/CodeEditor/EditorProvider'
import NoFileSelected from '../components/NoFileSelected'

import { buildEntriesFromGist } from '../utils/buildEntries'

import {
  DependencyList,
  FileSystemEntry,
  SaveStatus
} from '../components/CodeEditor/types'
import {
  GetGistById_getGistById,
  UpdateGist_updateGist
} from '../__generated__/types'
import MonacoEditor from '../components/CodeEditor/Monaco'
import { openEntry } from '../actions'

const defaultOptions = {
  fontSize: 12,
  automaticLayout: true,
  colorDecorators: true
}

export type Data = GetGistById_getGistById & ChildDataProps
type Files = Array<{ filename: string; content: string }>

interface GistByIdProps extends RouteComponentProps<{}> {
  onFileEntriesChange: (entries: FileSystemEntry[]) => Promise<void>
  onChangeCode: (code: string) => void
  onChangeGistId: (gistId: string) => void
  onChangeDescription: (description: string) => void
  onResetLocalState: () => void
  getConvertedEntries: () => Files
  onSaveGistCompleted: (data: UpdateGist_updateGist) => void
  handleOpenPath: (path: string) => void
  handleValueChange?: (value: string) => void
  getGistById: Data
  entries: FileSystemEntry[]
  entry: FileSystemEntry
  path: any
  gistId: string
  gistDescription: string
  value?: string
  saveStatus: SaveStatus
  dependencies?: DependencyList
  children?: React.ReactNode
  options?: any
  modelOptions?: any
}

export default class GistByIdView extends React.Component<GistByIdProps, null> {
  static contextType = EditorContext
  static defaultProps: Partial<GistByIdProps> = {
    dependencies: {
      react: { version: '16.3.1' }
    }
  }

  // tslint:disable-next-line: variable-name
  _EditorComponent: React.ComponentType<any>
  didMount: boolean
  initialValues: FileSystemEntry[] | []

  constructor(props: GistByIdProps) {
    super(props)

    this.didMount = false
    this.initialValues = props.entries || []
  }

  componentDidMount() {
    this.didMount = true
    if (this.props && this.props.getGistById) {
      const nextEntries = buildEntriesFromGist(this.props.getGistById)
      // get a snapshot of the initial state to calculate if a file is dirty
      this.initialValues = nextEntries
      this.props.onFileEntriesChange(nextEntries)
    }
    if (this.props && this.props.gistId) {
      this.props.onChangeGistId(this.props.gistId)
    }
    if (this.props && this.props.gistDescription) {
      this.props.onChangeDescription(this.props.gistDescription)
    }
    return
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props && this.props.gistId !== prevProps.gistId) {
      this.props.onChangeGistId(this.props.gistId)
    }

    if (
      this.props &&
      this.props.gistDescription !== prevProps.gistDescription
    ) {
      this.props.onChangeDescription(this.props.gistDescription)
    }

    if (this.props && this.props.getGistById !== prevProps.getGistById) {
      const nextEntries = buildEntriesFromGist(this.props.getGistById)
      this.props.onFileEntriesChange(nextEntries)
    }
    return
  }

  handleRenameFile = (oldPath: string, newPath: string) => {
    // tslint:disable-next-line: no-unused-expression
    this._EditorComponent && this._EditorComponent.renamePath(oldPath, newPath)
  }

  handleRemoveFile = (path: string) => {
    // tslint:disable-next-line: no-unused-expression
    this._EditorComponent && this._EditorComponent.removePath(path)
  }

  handleOpenPath = (path: string): Promise<void> =>
    this.props.onFileEntriesChange(openEntry(this.props.entries, path, true))

  componentWillUnmount() {
    this.didMount = false
    this.props.onResetLocalState()
  }

  render() {
    const {
      history,
      entries,
      entry,
      gistDescription,
      gistId,
      onSaveGistCompleted,
      getConvertedEntries,
      saveStatus
    } = this.props

    const renderSaveButton = saveStatus === 'changed'

    return this.props.getGistById ? (
      <React.Fragment>
        <h1>Viewing Gist: {gistId}</h1>
        <UserBtnsContainer>
          <BlueButton onClick={() => history.push('/editor')}>Back</BlueButton>
          <Delete gistId={gistId} history={history} />
          <Save
            dirty={renderSaveButton}
            gistId={gistId}
            description={this.props.getGistById.description}
            files={getConvertedEntries}
            onSaveCompleted={onSaveGistCompleted}
          />
        </UserBtnsContainer>
        <React.Fragment>
          <Skeleton
            sidebar={
              this.props && this.props.entries ? (
                <FileList
                  gistDescription={gistDescription}
                  gistId={gistId}
                  visible={true}
                  entries={this.props.entries}
                  onEntriesChange={this.props.onFileEntriesChange}
                  onRemoveFile={() =>
                    console.log('handleRemoveFile not yet implemented')
                  }
                  onRenameFile={this.handleRenameFile}
                  saveStatus={this.props.saveStatus}
                />
              ) : null
            }
            editor={
              entry && entry.item.type === 'file' ? (
                <MonacoEditor
                  editorDidMount={editor => editor}
                  onOpenPath={this.handleOpenPath}
                  onValueChange={this.props.onChangeCode}
                  path={this.props.path && this.props.path.item.path}
                  value={this.props.entry && this.props.entry.item.content}
                  entries={entries}
                  options={defaultOptions}
                  autoFocus={true}
                  modelOptions={{ tabSize: 2 }}
                />
              ) : (
                <NoFileSelected />
              )
            }
            footer={
              <Footer
                currentFile={this.props.entry && this.props.entry.item.path}
                iconComponent={
                  <Icon
                    height={17}
                    filename={this.props.entry && this.props.entry.item.path}
                  />
                }
                status={saveStatus === 'published' ? 'Gist saved!' : null}
              />
            }
          />
        </React.Fragment>
      </React.Fragment>
    ) : null
  }
}

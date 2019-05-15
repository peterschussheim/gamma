import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { ChildDataProps } from 'react-apollo'

import { UserBtnsContainer, BlueButton } from '../components/Buttons'
import Skeleton from '../components/Skeleton'
import MonacoEditor from '../components/CodeEditor/Monaco'
import Footer from '../components/Footer'
import { CreateNewGist } from '../components/CreateNewGist'
import { Icon } from '../components/Icon'
import NoFileSelected from '../components/NoFileSelected'
import FileList from '../components/SidebarList/FileList'

import { openEntry } from '../actions'
import { buildEntriesFromGist } from '../utils/buildEntries'

import {
  FileSystemEntry,
  DependencyList,
  SaveStatus
} from '../components/CodeEditor/types'
import {
  UpdateGist_updateGist,
  CreateGist_createGist
} from '../__generated__/types'
import SecretIcon from '../components/PrivateIcon'

const defaultOptions = {
  fontSize: 12,
  automaticLayout: true,
  colorDecorators: true
}

type Data = Partial<CreateGist_createGist> & ChildDataProps
type Files = Array<{ filename: string; content: string }>

interface NewGistViewProps extends RouteComponentProps<{}> {
  onFileEntriesChange: (entries: FileSystemEntry[]) => Promise<void>
  onChangeCode: (code: string) => void
  onChangeGistId: (gistId: string) => void
  onChangeDescription: (description: string) => void
  onResetLocalState: () => void
  getConvertedEntries: () => Files
  onSaveGistCompleted: (data: UpdateGist_updateGist) => void
  handleOpenPath: (path: string) => void
  handleValueChange?: (value: string) => void
  initialData: Data
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

export default class NewGistView extends React.Component<
  NewGistViewProps,
  null
> {
  static defaultProps: Partial<NewGistViewProps> = {
    dependencies: {
      react: { version: '16.3.1' }
    }
  }

  // tslint:disable-next-line: variable-name
  _EditorComponent: React.ComponentType<any>
  didMount: boolean
  initialValues: FileSystemEntry[] | []

  constructor(props: NewGistViewProps) {
    super(props)

    this.didMount = false
    this.initialValues = props.initialData || []
  }

  componentDidMount() {
    this.didMount = true
    if (this.props && this.props.initialData) {
      const nextEntries = buildEntriesFromGist(this.props.initialData)
      // get a snapshot of the initial state to calculate if a file is dirty
      this.initialValues = nextEntries
      this.props.onFileEntriesChange(nextEntries)
    }

    if (this.props && this.props.initialData.isPublic != null) {
      this.props.onChangeVisibility(this.props.initialData.isPublic)
    }

    // set an initial default description
    this.props.onChangeDescription(this.props.initialData.description)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props &&
      this.props.gistDescription !== prevProps.gistDescription
    ) {
      this.props.onChangeDescription(this.props.gistDescription)
    }

    if (
      this.props &&
      this.props.isPublic !== prevProps.isPublic &&
      prevProps.isPublic == null
    ) {
      // console.log('vis changed')
      this.props.onChangeVisibility(this.props.isPublic)
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
      isPublic,
      gistDescription,
      gistId,
      onSaveGistCompleted,
      getConvertedEntries,
      saveStatus
    } = this.props

    return (
      <React.Fragment>
        <UserBtnsContainer>
          <BlueButton onClick={() => history.push('/editor')}>Back</BlueButton>
          <CreateNewGist
            history={history}
            dirty={true}
            gistId={gistId}
            isPublic={isPublic}
            description={gistDescription}
            files={getConvertedEntries}
            onSaveCompleted={onSaveGistCompleted}
          />
        </UserBtnsContainer>
        <React.Fragment>
          <Skeleton
            sidebar={
              this.props && this.props.entries.length > 0 ? (
                <FileList
                  gistDescription={gistDescription}
                  gistId={gistId}
                  visible={true}
                  entries={this.props.entries}
                  onEditDescription={this.props.onShowDescriptionEdit}
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
                isPublic={<SecretIcon isPublic={isPublic} height={17} />}
                iconComponent={
                  this.props.entry != null ? (
                    <Icon
                      height={17}
                      filename={this.props.entry && this.props.entry.item.path}
                    />
                  ) : null
                }
                status={saveStatus === 'published' ? 'Gist saved!' : null}
              />
            }
          />
        </React.Fragment>
      </React.Fragment>
    )
  }
}

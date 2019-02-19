// tslint:disable:max-line-length

import * as React from 'react'

import { ChildDataProps, graphql } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import CodeEditor from '../components/CodeEditor'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import { Icon } from '../components/Icon'
import { UserBtnsContainer, BlueButton } from '../components/Buttons'
import { Save } from '../components/Save'
import Delete from '../components/Delete'
import FileList from '../components/SidebarList/FileList'
import GistFilesList from '../components/SidebarList/GistFilesList'
import { EditorContext } from '../components/CodeEditor/EditorProvider'
import { buildEntriesFromGist } from '../utils/buildEntries'
import { GetGistById } from '../__generated__/types'
import {
  DependencyList,
  Gist,
  FileSystemEntry,
  TextFileEntry
} from '../components/CodeEditor/types'
import { isFileDirty } from '../utils/isGistDirty'
import { GET_GIST_BY_ID } from '../queries'
import NoFileSelected from '../components/NoFileSelected'

const defaultOptions = {
  fontSize: 12,
  automaticLayout: true,
  colorDecorators: true
}

type Data = GetGistById & ChildDataProps

interface Variables {
  gistId: string
}

interface GistByIdProps extends RouteComponentProps<{}> {
  onFileEntriesChange: (entries: FileSystemEntry[]) => Promise<void>
  onChangeCode: (code: string) => void
  handleOpenPath: (path: string) => void
  handleValueChange?: (value: string) => void
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

export default class GistByIdView extends React.Component<GistByIdProps, null> {
  static contextType = EditorContext
  constructor(props) {
    super(props)
  }
  static defaultProps: Partial<GistByIdProps> = {
    dependencies: {
      react: { version: '16.3.1' }
    }
  }

  componentDidMount() {
    if (this.props && this.props.getGistById) {
      const nextEntries = buildEntriesFromGist(this.props.getGistById)
      this.props.onFileEntriesChange(nextEntries)
    }
    return
  }

  // TODO: Figure this out!!
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props && this.props.getGistById) {
  //     if (prevProps.fileEntries)
  //     const nextEntries = buildEntriesFromGist(this.props.getGistById)
  //     this.props.onFileEntriesChange(nextEntries)
  //   }
  //   return
  // }

  handleValueChange = (value: string) => {
    this.context.change('changes', value)
  }

  handleOpenPath = (path: string) => {
    // this.context.change('currentFilename', path)
    // this.props
  }

  handleDescriptionChange = e => {
    this.context.change('gistDescription', e)
  }

  handleFilenameChange = e => {
    console.log('handleChangeFilename not yet implemented')
  }

  render() {
    const { history, entries, entry, gistId } = this.props
    const context = this.context

    return this.props.getGistById ? (
      <React.Fragment>
        <h1>Viewing Gist: {gistId}</h1>
        <UserBtnsContainer>
          <BlueButton onClick={() => history.push('/editor')}>Back</BlueButton>
          <Delete gistId={gistId} history={history} />
          <Save
            gistId={gistId}
            description={this.props.getGistById.description}
            changedFiles={context.values.changes}
            handleResetChanges={context.reset}
          />
        </UserBtnsContainer>
        <React.Fragment>
          <Skeleton
            sidebar={
              this.props && this.props.entries ? (
                <FileList
                  visible={true}
                  entries={this.props.entries}
                  onEntriesChange={this.props.onFileEntriesChange}
                  onRemoveFile={this.handleRemoveFile}
                  onRenameFile={this.handleRenameFile}
                  saveStatus={this.props.saveStatus}
                />
              ) : null
            }
            editor={
              entry && entry.item.type === 'file' ? (
                <CodeEditor
                  onOpenPath={path => context.change('currentFilename', path)}
                  onValueChange={v => this.handleValueChange(v)}
                  path={this.props.path && this.props.path.item.path}
                  value={this.props.entry && this.props.entry.item.content}
                  entries={entries}
                  options={defaultOptions}
                  modelOptions={{ tabSize: 2 }}
                />
              ) : (
                <NoFileSelected />
              )
            }
            footer={
              <Footer
                currentFile={context.values.currentFilename}
                iconComponent={
                  <Icon height={17} filename={context.values.currentFilename} />
                }
              />
            }
          />
          {/* <Debugger
                componentName="GistByIdView"
                props={this.props}
                context={this.context}
              /> */}
        </React.Fragment>
      </React.Fragment>
    ) : null
  }
}

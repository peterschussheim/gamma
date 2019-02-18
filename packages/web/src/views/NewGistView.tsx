import * as React from 'react'
import { match } from 'react-router'

import { UserBtnsContainer, DefaultButton } from '../components/Buttons'
import Skeleton from '../components/Skeleton'
import GistFilesList from '../components/SidebarList/GistFilesList'
import CodeEditor from '../components/CodeEditor'
import Footer from '../components/Footer'
import { Icon } from '../components/Icon'
import { Debugger } from '../components/Debugger'
import { EditorContext } from '../components/CodeEditor/EditorProvider'
import { buildEntriesFromGist } from '../utils/buildEntries'

import { isFileDirty } from '../utils/isGistDirty'

interface NewGistViewState {
  gistId: string
  description: string
  modalVisible?: boolean
  files: Array<{
    filename: string
    content: string
  }>
}

interface NewGistViewProps {
  onCancelNewGist: () => void
  modalVisible?: boolean
  context: any
  match?: match
  history?: any
}

const initialState = {
  modalVisible: false,
  gistId: '',
  description: 'New gist',
  files: [{ filename: 'index.js', content: '' }]
}

export default class NewGistView extends React.Component<
  NewGistViewProps,
  NewGistViewState
> {
  static contextType = EditorContext
  static defaultProps: Partial<NewGistViewProps> = {
    modalVisible: false
  }
  constructor(props: NewGistViewProps) {
    super(props)
    this.state = initialState
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  handleAdditionalFile = () => {
    // prompt user for a filename
    this.toggleModal()
    this.setState(
      (prevState, props) => ({
        files: prevState.files.concat({ filename: '', content: '' })
      }),
      () => this.handleOpenPath(this.state.files[0].filename)
    )
  }

  handleOpenPath = (path: string) => {
    this.context.change('currentFilename', path)
  }

  handleDescriptionChange = e => {
    this.context.change('gistDescription', e)
  }

  handleValueChange = e => {
    this.context.change('changes', e)
  }

  handleFilenameChange = e => {
    console.log('e', e)
  }

  render() {
    const context = this.context
    const { history } = this.props
    const data = { ...this.state }

    const entries = buildEntriesFromGist(data)
    const isGistDirty = data.files
      .map(file => {
        return isFileDirty(context.values.changes, file)
      })
      .some(element => element === true)

    const initialValue = entries.find(
      ({ item }) => item.path === context.values.currentFilename
    )

    const existingFileIndex = this.context.values.changes.findIndex(
      file => file.filename === this.context.values.currentFilename
    )

    return (
      <React.Fragment>
        <UserBtnsContainer>
          <DefaultButton onClick={() => history.push('/editor')}>
            Cancel
          </DefaultButton>
          <DefaultButton onClick={this.handleAdditionalFile}>
            Add Another File
          </DefaultButton>
        </UserBtnsContainer>
        <Skeleton
          sidebar={
            <GistFilesList
              onDescriptionChange={this.handleDescriptionChange}
              onFilenameChange={this.handleFilenameChange}
              isCreating={true}
              loading={false}
              data={data}
            />
          }
          editor={
            <CodeEditor
              onOpenPath={path => this.handleOpenPath(path)}
              onValueChange={v => this.handleValueChange(v)}
              path={context.values.currentFilename}
              value={
                isGistDirty === true && existingFileIndex !== -1
                  ? this.context.values.changes[existingFileIndex].content
                  : initialValue && initialValue.item.content
              }
              entries={entries}
              options={{
                fontSize: 12,
                automaticLayout: true,
                colorDecorators: true
              }}
              modelOptions={{ tabSize: 2 }}
            />
          }
          footer={
            <Footer
              status={null}
              currentFile={context.values.currentFilename}
              iconComponent={
                <Icon height={17} filename={context.values.currentFilename} />
              }
            />
          }
        />
        <Debugger
          componentName="NewGistView"
          state={this.state}
          props={this.props}
          context={context}
        />
      </React.Fragment>
    )
  }
}

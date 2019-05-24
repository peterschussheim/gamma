/** @jsx jsx */
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { jsx } from '@emotion/core'
import { css } from 'emotion'
import Login from './components/Form/Login'
import Signup from './components/Form/Signup'

import Profile from './views/Profile'
import { graphql, Query } from 'react-apollo'
import { VIEWER_GISTS, GET_GIST_BY_ID } from './queries'

import EditorView from './views/EditorView'
import GistByIdView from './views/GistByIdView'
import Home from './views/Home'
import NewGistView from './views/NewGistView'
import ConfirmEmail from './views/ConfirmEmail'
import NotFound from './views/NotFound'
import Navbar from './components/Navbar'
import { EditorContext } from './components/CodeEditor/EditorProvider'
import { updateEntry } from './actions'
import {
  FileSystemEntry,
  TextFileEntry,
  SaveStatus
} from './components/CodeEditor/types'
import { entryArrayToGist } from './utils/convertFileStructure'
import { buildEntriesFromGist } from './utils/buildEntries'
import ModalEditMeta from './components/Modal/ModalEditMeta'

// TODO: remove any
const EditorViewWithData: any = graphql(VIEWER_GISTS, {
  options: () => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    ssr: true
  })
})(EditorView)

interface IEditMeta {
  isPublic: boolean
  description: string
}

type Props = {
  data?: any
  url?: string
  location?: any
  cookie?: any
  currentUser?: any
}

type State = {
  fileEntries: FileSystemEntry[]
  isPublic: boolean
  gistDescription: string
  gistId: string
  saveStatus: SaveStatus
  currentModal: null | 'edit-description'
}

const initialState: State = {
  fileEntries: [],
  isPublic: null,
  gistDescription: '',
  gistId: '',
  saveStatus: 'no-changes',
  currentModal: null
}

export default class Router extends React.Component<Props, State> {
  static contextType = EditorContext
  constructor(props: Props) {
    super(props)
    this.state = initialState
  }

  componentDidUpdate(props, prevState) {
    if (this.state.fileEntries === prevState.fileEntries) {
      return
    }

    let didFilesChange = false

    if (this.state.fileEntries.length !== prevState.fileEntries.length) {
      didFilesChange = true
    } else {
      const items: {
        [key: string]: FileSystemEntry['item']
      } = prevState.fileEntries.reduce(
        (acc: { [key: string]: FileSystemEntry['item'] }, { item }) => {
          acc[item.path] = item
          return acc
        },
        {}
      )

      didFilesChange = this.state.fileEntries.some(
        ({ item }) => !item.virtual && items[item.path] !== item
      )
    }

    if (didFilesChange) {
      // this.recordChange
      // console.log('didFilesChange: ', didFilesChange)
      // this.sendCode()
      // this.handleSaveDraft()
    }
  }

  handleChangeCode = (content: string) => {
    this.setState((state: State) => ({
      saveStatus: 'changed',
      fileEntries: state.fileEntries.map(entry => {
        if (entry.item.type === 'file' && entry.state.isFocused) {
          return updateEntry(entry, { item: { content } })
        }
        return entry
      })
    }))
  }

  handleFileEntriesChange = (
    nextFileEntries: FileSystemEntry[]
  ): Promise<void> => {
    return new Promise(resolve =>
      this.setState(state => {
        // tslint:disable-next-line: prefer-const
        let fileEntries = nextFileEntries.map(entry => entry)

        return { fileEntries }
      }, resolve)
    )
  }

  handleResetLocalState = () => {
    this.setState({ ...initialState })
  }

  handleConvertFilesBeforeSave = () => {
    this.setState(state => ({
      saveStatus: 'publishing'
    }))

    const convertedFiles = entryArrayToGist(
      this.state.fileEntries.filter(e => !e.item.virtual)
    )
    return convertedFiles
  }

  handleSaveGistCompleted = (mutationResponse: any) => {
    this.setState(state => ({
      saveStatus: 'published'
    }))

    const nextFileEntries = buildEntriesFromGist(mutationResponse)
    // this.handleGistIdChange(updateGist.gistId)
    this.handleFileEntriesChange(nextFileEntries)
  }

  findFocusedEntry = (entries: FileSystemEntry[]): TextFileEntry | undefined =>
    // @ts-ignore
    entries.find(
      ({ item, state }) => item.type === 'file' && state.isFocused === true
    )

  handleGistIdChange = (gistId: string) => {
    this.setState(state => {
      return { gistId }
    })
  }

  handleEditMeta = (data: IEditMeta) => {
    this.setState(prevState => {
      return {
        isPublic:
          data.isPublic !== undefined ? data.isPublic : prevState.isPublic,
        gistDescription:
          data.description !== undefined
            ? data.description
            : prevState.gistDescription,
        currentModal: null,
        saveStatus: 'changed'
      }
    })
  }

  handleEditVisibility = (isPublic: boolean) => {
    this.setState(prevState => {
      return {
        isPublic,
        currentModal: null
      }
    })
  }

  handleEditDescription = (gistDescription: string) => {
    this.setState(prevState => {
      return {
        gistDescription,
        currentModal: null
      }
    })
  }

  handleDismissEditModal = () => {
    this.setState({ currentModal: null })
  }

  handleShowDescriptionModal = () => {
    this.setState({ currentModal: 'edit-description' })
  }

  handleSaveStatusChange = (nextSaveStatus: SaveStatus) => {
    this.setState({
      saveStatus: nextSaveStatus
    })
  }

  render() {
    const {
      currentModal,
      fileEntries,
      isPublic,
      gistDescription,
      saveStatus
    } = this.state
    return (
      <div
        className={css({
          position: 'relative'
        })}
      >
        <Navbar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route exact={true} path="/auth/login" component={Login} />
          <Route exact={true} path="/auth/signup" component={Signup} />
          <Route exact={true} path="/success" component={Home} />
          <Route
            exact={true}
            path="/editor"
            render={({ history }) => <EditorViewWithData history={history} />}
          />
          <Route
            exact={true}
            path="/g/:gistId"
            render={({ history, match }) => {
              const gistId = match && match.url.split('/')[2]
              const focusedEntry = this.findFocusedEntry(fileEntries)
              return (
                <Query
                  query={GET_GIST_BY_ID}
                  variables={{
                    gistId
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return 'Loading...'
                    } else if (error) {
                      return `Error! ${error.message}`
                    } else {
                      return (
                        data.getGistById && (
                          <React.Fragment>
                            <ModalEditMeta
                              visible={currentModal === 'edit-description'}
                              action="Save Changes"
                              title="Edit Gist metadata"
                              isPublic={isPublic}
                              description={gistDescription}
                              onDismiss={this.handleDismissEditModal}
                              onSave={this.handleEditMeta}
                            />
                            <GistByIdView
                              onChangeCode={this.handleChangeCode}
                              onFileEntriesChange={this.handleFileEntriesChange}
                              onChangeGistId={this.handleGistIdChange}
                              onResetLocalState={this.handleResetLocalState}
                              onChangeVisibility={this.handleEditVisibility}
                              onChangeDescription={this.handleEditDescription}
                              onSaveStatusChange={this.handleSaveStatusChange}
                              onShowDescriptionEdit={
                                this.handleShowDescriptionModal
                              }
                              onHideDescriptionEdit={
                                this.handleDismissEditModal
                              }
                              onSaveGistCompleted={this.handleSaveGistCompleted}
                              getConvertedEntries={
                                this.handleConvertFilesBeforeSave
                              }
                              history={history}
                              getGistById={data.getGistById}
                              entries={fileEntries}
                              entry={focusedEntry}
                              path={focusedEntry}
                              gistId={gistId}
                              isPublic={isPublic}
                              gistDescription={gistDescription}
                              saveStatus={saveStatus}
                            />
                          </React.Fragment>
                        )
                      )
                    }
                  }}
                </Query>
              )
            }}
          />
          <Route
            exact={true}
            path="/new"
            render={({ history }) => {
              const focusedEntry = this.findFocusedEntry(this.state.fileEntries)
              return (
                <React.Fragment>
                  <ModalEditMeta
                    visible={currentModal === 'edit-description'}
                    action="Save Changes"
                    title="Edit Gist metadata"
                    isPublic={isPublic}
                    description={gistDescription}
                    isNewGist={true}
                    onDismiss={this.handleDismissEditModal}
                    onSave={this.handleEditMeta}
                  />
                  <NewGistView
                    onChangeCode={this.handleChangeCode}
                    onFileEntriesChange={this.handleFileEntriesChange}
                    onChangeGistId={this.handleGistIdChange}
                    onResetLocalState={this.handleResetLocalState}
                    onChangeVisibility={this.handleEditVisibility}
                    onChangeDescription={this.handleEditDescription}
                    onSaveStatusChange={this.handleSaveStatusChange}
                    onShowDescriptionEdit={this.handleShowDescriptionModal}
                    onHideDescriptionEdit={this.handleDismissEditModal}
                    onSaveGistCompleted={this.handleSaveGistCompleted}
                    getConvertedEntries={this.handleConvertFilesBeforeSave}
                    history={history}
                    initialData={{
                      gistId: '',
                      description: 'NEW GIST change me',
                      files: [
                        { filename: 'readme.md', content: '## Welcome!' }
                      ],
                      isPublic: false
                    }}
                    entries={fileEntries}
                    entry={focusedEntry}
                    path={focusedEntry}
                    gistId={this.state.gistId}
                    isPublic={isPublic}
                    gistDescription={gistDescription}
                    saveStatus={saveStatus}
                  />
                </React.Fragment>
              )
            }}
          />
          <Route
            exact={true}
            path="/confirm"
            component={ConfirmEmail}
            props={this.props}
          />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    )
  }
}

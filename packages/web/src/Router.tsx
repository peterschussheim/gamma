import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

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
import { Global } from '@emotion/core'
import globalStyles from './components/global'
import Navbar from './components/Navbar'
import { EditorContext } from './components/CodeEditor/EditorProvider'
import { updateEntry, openEntry } from './actions'
import {
  FileSystemEntry,
  TextFileEntry,
  SaveStatus
} from './components/CodeEditor/types'
import { debounce } from 'lodash'
import { entryArrayToGist } from './utils/convertFileStructure'
import { buildEntriesFromGist } from './utils/buildEntries'

const EditorViewWithData = graphql(VIEWER_GISTS, {
  options: () => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    ssr: true
  })
})(EditorView)

type State = {
  fileEntries: FileSystemEntry[]
  gistDescription: string
  gistId: string
  saveStatus: SaveStatus
}

const initialState: State = {
  fileEntries: [],
  gistDescription: '',
  gistId: '',
  saveStatus: 'no-changes'
}

export default class Router extends React.Component<null, State> {
  static contextType = EditorContext
  constructor(props) {
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

  // TODO: fix cannot read property 'item' undefined
  handleSaveGistCompleted = (updateGist: any) => {
    const lastFile = this.findFocusedEntry(this.state.fileEntries)
    this.setState(state => ({
      saveStatus: 'published'
    }))
    console.log('save Completed event fired', lastFile)
    const nextFileEntries = buildEntriesFromGist(updateGist)

    this.handleFileEntriesChange(nextFileEntries)
    this.handleFileEntriesChange(
      openEntry(nextFileEntries, lastFile.item.path, true)
    )
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

  handleGistDescriptionChange = (gistDescription: string) => {
    this.setState(state => {
      return {
        gistDescription
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Global styles={globalStyles} />
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
              const focusedEntry = this.findFocusedEntry(this.state.fileEntries)
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
                          <GistByIdView
                            onChangeCode={this.handleChangeCode}
                            onFileEntriesChange={this.handleFileEntriesChange}
                            onChangeGistId={this.handleGistIdChange}
                            onResetLocalState={this.handleResetLocalState}
                            onChangeDescription={
                              this.handleGistDescriptionChange
                            }
                            onSaveGistCompleted={this.handleSaveGistCompleted}
                            getConvertedEntries={
                              this.handleConvertFilesBeforeSave
                            }
                            history={history}
                            getGistById={data.getGistById}
                            entries={this.state.fileEntries}
                            entry={focusedEntry}
                            path={focusedEntry}
                            gistId={gistId}
                            gistDescription={data.getGistById.description}
                            saveStatus={this.state.saveStatus}
                          />
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
            render={({ history }) => <NewGistView history={history} />}
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
      </React.Fragment>
    )
  }
}

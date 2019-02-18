import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './components/Form/Login'
import Signup from './components/Form/Signup'

import Profile from './views/Profile'
import App from './App'

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

type Props = {
  data:
    | {
        type: 'success'
        gist: object | null
      }
    | {
        type: 'error'
        error: {
          message: string
        }
      }
    | null
}

const EditorViewWithData = graphql(VIEWER_GISTS, {
  options: () => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    ssr: true
  })
})(EditorView)

export default class Router extends React.Component<Props> {
  static contextType = EditorContext
  state = {
    fileEntries: []
  }

  handleChangeCode = (content: string) =>
    this.setState((state: State) => ({
      saveStatus: 'changed',
      fileEntries: state.fileEntries.map(entry => {
        if (entry.item.type === 'file' && entry.state.isFocused) {
          return updateEntry(entry, { item: { content } })
        }
        return entry
      })
    }))

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

  findFocusedEntry = (entries: FileSystemEntry[]): TextFileEntry | undefined =>
    // @ts-ignore
    entries.find(
      ({ item, state }) => item.type === 'file' && state.isFocused === true
    )

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
                            gistId={gistId}
                            history={history}
                            getGistById={data.getGistById}
                            onChangeCode={this.handleChangeCode}
                            onFileEntriesChange={this.handleFileEntriesChange}
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

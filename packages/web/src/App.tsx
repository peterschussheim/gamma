import * as React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import routes from './routes'
import Navbar from './components/Navbar'
import NotFound from './views/NotFound'
import globalStyles from './components/global'
import { Global } from '@emotion/core'
import './styles.css'
import {
  GistFiles,
  FileSystemEntry,
  TextFileEntry
} from './components/CodeEditor/types'
import {
  INITIAL_DESCRIPTION,
  INITIAL_DEPENDENCIES,
  buildEntriesFromGist,
  buildEntriesFromDefaultCode
} from './utils/buildEntries'

import { updateEntry } from './actions'
import EditorView from './views/EditorView'

class App extends React.Component {
  constructor(props) {
    super(props)
    // let gistId = props.location.pathname.split('/')[2] || ''
    // const usingDefaultCode = !gistId

    let code: GistFiles | string =
      props.data && props.data.getGistById
        ? props.data.getGistById
        : INITIAL_CODE

    let description = INITIAL_DESCRIPTION
    let dependencies = INITIAL_DEPENDENCIES
    // let dependencies = usingDefaultCode ? INITIAL_DEPENDENCIES : {}

    const fileEntries =
      props.data && props.data.getGistById
        ? buildEntriesFromGist(props.data.getGistById)
        : buildEntriesFromDefaultCode(INITIAL_CODE)
    // const fileEntries = usingDefaultCode
    //   ? buildEntriesFromDefaultCode(code)
    //   : buildEntriesFromGist(props.data.getGistById.files)

    this.state = {
      gistId: '',
      description,
      files: code,
      dependencies,
      fileEntries: [...fileEntries],
      saveHistory: props.gist && props.gist.history ? props.gist.history : [],
      saveStatus: 'changed'
    }
  }

  // static getDerivedStateFromProps(props, state: State) {
  //   if (
  //     props.location &&
  //     props.location.pathname.split('/')[2] !== state.gistId
  //   ) {
  //     const { location } = props
  //     const { gistId } = state

  //     return {
  //       gistId: location.pathname.split('/')[2]
  //     }
  //   }
  //   if (
  //     state.gistId &&
  //     state.gistId.length > 0 &&
  //     props.data.getGistById &&
  //     props.data.getGistById.gistId !== state.gistId
  //   ) {
  //     const fileEntries = buildEntriesFromGist(props.data.getGistById)
  //     return {
  //       fileEntries
  //     }
  //   }

  //   return null
  // }

  render() {
    return (
      <div>
        <EditorView />
      </div>
    )
  }
}

export default App

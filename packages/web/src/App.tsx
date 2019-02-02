import * as React from 'react'
import AppRouter from './AppRouter'
import { history } from './utils/history'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

import { cache, errorLink, requestLink } from './apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'

import { EditorProvider } from './components/CodeEditor/EditorProvider'
import './styles.css'
import {
  SaveHistory,
  FileSystemEntry,
  SaveStatus,
  GistFiles,
  GistWorkspace,
  TextFileEntry,
  Gist
} from './components/CodeEditor/types'
import { GetGistById } from './__generated__/types'
import { updateEntry } from './actions'

const links = [errorLink, requestLink]

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  // @ts-ignore
  cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache
})

/**
 * accepts an array of objects containing files for a given gist
 * and returns a new array with objects matching `TextFileEntry` type.
 */
export const buildEntriesFromGist = ({
  getGistById
}: GetGistById): TextFileEntry[] => {
  const fileSystemArray = []

  getGistById.files.forEach(file => {
    fileSystemArray.push({
      item: {
        gistId: getGistById.gistId,
        path: file.filename,
        content: file.content,
        gistDescription: getGistById.description,
        type: 'file'
      },
      state: {}
    })
  })

  return fileSystemArray
}

/**
 * accepts an object of objects containing dummy files for use when creating
 * a new gist and returns a new array matching `TextFileEntry` type.
 */
export const buildEntriesFromDefaultCode = (
  defaultCode: Partial<Gist>
): TextFileEntry[] => {
  const fileSystemArray = []

  for (const filename of Object.keys(defaultCode).sort()) {
    fileSystemArray.push({
      item: {
        gistId: '',
        path: filename,
        content: defaultCode[filename].contents,
        gistDescription: INITIAL_DESCRIPTION,
        type: 'file'
      },
      state: {}
    })
  }

  return fileSystemArray
}

/**
 * use the `INITIAL_XXX` constants below to help create new gists.
 */
const INITIAL_CODE: GistFiles = {
  'README.md': {
    contents: `# README\n## Topic`,
    type: 'CODE'
  },
  'App.tsx': {
    contents: `import * as React from 'react'\n
    export default class App extends React.Component {}`,
    type: 'CODE'
  }
}
const INITIAL_DESCRIPTION: string = 'Change me!'
const INITIAL_DEPENDENCIES = { react: { version: '16.3.1' } }

type Params = {
  /** id produced when saving changed files */
  id?: string
  gistId?: string
}

type Props = {
  getGistById?: GetGistById
  gist?: GistWorkspace
  history: {
    push: (props: { pathname: string; search: string }) => void
  }
  match: {
    params: Params
  }
  location: {
    search: string
  }
}

type SessionState = {
  gistId: string
  description: string
  files: GistFiles
  dependencies: { [key: string]: { version: string } }
  isSaved?: boolean
}

type State = {
  sessionState: SessionState
  isSavedOnce: boolean
  saveHistory: SaveHistory
  saveStatus: SaveStatus
  params?: Params
  fileEntries: FileSystemEntry[]
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const usingDefaultCode = !(props.gist && props.gist.code)

    let code: GistFiles | string =
      props.gist && props.gist.code ? props.gist.code : INITIAL_CODE

    let gistId = ''
    let description = INITIAL_DESCRIPTION
    let dependencies = usingDefaultCode ? INITIAL_DEPENDENCIES : {}

    const sessionState: SessionState = {
      gistId,
      description,
      files: code,
      dependencies
    }

    const fileEntries = usingDefaultCode
      ? buildEntriesFromDefaultCode(code)
      : buildEntriesFromGist(props.getGistById)

    this.state = {
      sessionState,
      fileEntries: [...fileEntries],
      isSavedOnce: false,
      saveHistory: props.gist && props.gist.history ? props.gist.history : [],
      saveStatus: 'changed'
    }
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
      <ApolloProvider client={client}>
        <HelmetProvider>
          <BrowserRouter>
            <EditorProvider>
              <AppRouter data={window.__DATA__.data} />
            </EditorProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ApolloProvider>
    )
  }
}

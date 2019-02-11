import * as React from 'react'

import { RouteComponentProps } from 'react-router-dom'

import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import GistList from '../components/SidebarList/GistList'
import { Icon } from '../components/icon'
import { UserBtnsContainer, BlueButton } from '../components/Buttons'

import { EditorContext } from '../components/CodeEditor/EditorProvider'

import {
  DependencyList,
  FileSystemEntry,
  TextFileEntry,
  Annotation
} from '../components/CodeEditor/types'
import { NewGist } from '../components/NewGist'
import CodeEditor from '../components/CodeEditor'
import { Debugger } from '../components/Debugger'
import { openEntry } from '../actions'
// import lintEntry from '../utils/lintEntry'
import debounce from 'lodash/debounce'

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

  componentDidUpdate(prevProps: EditorViewProps) {
    if (this.props.entry !== prevProps.entry) {
      // this.lint(this.props.entry)
    }
  }

  handleOpenPath = (path: string): Promise<void> =>
    this.props.onFileEntriesChange(openEntry(this.props.entries, path, true))

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
    console.log(this.props)
    const { entry, entries } = this.props
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
          editor={
            <CodeEditor
              onValueChange={this.props.onChangeCode}
              onOpenPath={this.handleOpenPath}
              dependencies={this.props.dependencies}
              entries={this.props.entries}
              annotations={annotations}
              path={entry && entry.item.path}
              value={entry && entry.item.type === 'file' && entry.item.content}
              options={{
                fontSize: 12,
                automaticLayout: true,
                colorDecorators: true
              }}
            />
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
        <Debugger
          componentName="EditorView"
          context={context}
          props={this.props}
        />
      </React.Fragment>
    )
  }
}

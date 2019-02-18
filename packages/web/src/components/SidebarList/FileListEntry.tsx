/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import FileListEntryBase from './FileListEntryBase'
import FileListChildren from './FileListChildren'
import { isEntryPoint } from '../../utils/fileUtilities'
import { FileSystemEntry } from '../CodeEditor/types'
// import EditIcons from '../EditIcons'

type Props = {
  entry: FileSystemEntry
  rest: FileSystemEntry[]
  onOpen: (path: string) => void
  onFocus: (path: string) => void
  onSelect: (path: string) => void
  onDelete: (path: string) => void
  onExpand: (path: string, expand?: boolean) => void
  onRename: (oldPath: string, newPath: string) => void
  onCreateFile: (path: string | undefined) => void
  getAdjacentEntries: () => FileSystemEntry[]
}

type State = {
  name: string
  error: Error | null
  isRenaming: boolean
}

export default class FileListEntry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { entry } = props

    this.state = {
      name: entry.state.isCreating
        ? entry.item.path.split('/').pop() || ''
        : '',
      error: null,
      // @ts-ignore
      isRenaming: !entry.item.asset && !!entry.state.isCreating
    }
  }

  state: State

  componentDidMount() {
    if (this.props.entry.state.isCreating) {
      this.props.onOpen(this.props.entry.item.path)
    }
  }

  handleToggleExpand = () =>
    this.props.onExpand(
      this.props.entry.item.path,

      !this.props.entry.state.isExpanded
    )

  handleToggleRename = () => {
    if (this.state.isRenaming && !this.state.error) {
      this.handleNameChange(this.state.name)
    }

    this.setState((state, props) =>
      state.isRenaming
        ? {
            isRenaming: false,
            name: '',
            error: null
          }
        : {
            isRenaming: true,
            name: props.entry.item.path.split('/').pop() || '',
            error: null
          }
    )
  }

  handleDelete = () => this.props.onDelete(this.props.entry.item.path)

  handleNameChange = (name: string) => {
    const { entry } = this.props

    if (
      name &&
      (name !== entry.item.path.split('/').pop() || entry.state.isCreating)
    ) {
      const newPath = entry.item.path.replace(/[^/]+$/, name)

      this.props.onRename(entry.item.path, newPath)
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value

    this.setState({
      name,
      error: this.validateName(name)
    })
  }

  validateName = (name: string) => {
    if (name === this.props.entry.item.path.split('/').pop()) {
      return null
    }

    const invalidCharacters = ['\0', '\\', ':', '*', '?', '"', '<', '>', '|']
    const usedCharacters = invalidCharacters.filter(c => name.includes(c))

    if (usedCharacters.length) {
      return new Error(
        `${
          usedCharacters.length === 1
            ? `${usedCharacters[0]} is`
            : `${usedCharacters.join(', ')} are`
        } not allowed`
      )
    }

    const adjacentEntries = this.props.getAdjacentEntries()

    if (
      adjacentEntries.some(
        e =>
          (e.item.path.split('/').pop() || '').toLowerCase() ===
          name.toLowerCase()
      )
    ) {
      return new Error(`Another entry already exists with same name`)
    }

    if (isEntryPoint(name)) {
      return new Error(`Cannot name a new file as ${name}`)
    }

    return null
  }

  handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target
    if (input instanceof HTMLInputElement) {
      input.select()
    }
  }

  handleInputBlur = () => {
    if (!this.state.error) {
      this.handleNameChange(this.state.name)
    }
    this.setState({
      isRenaming: false,
      name: '',
      error: null
    })
  }

  handleCreateFile = () => this.props.onCreateFile(this.props.entry.item.path)

  renderItem = () => {
    const { entry } = this.props
    const { isRenaming, name } = this.state
    const displayName = isRenaming ? '\u00A0' : entry.item.path.split('/').pop()

    return (
      <div>
        {this.state.error ? (
          <div
            css={css({
              backgroundColor: 'red',
              color: '#fff',
              padding: '4px 8px',
              position: 'fixed',
              marginTop: -32,
              marginLeft: 20,
              borderRadius: 3
            })}
          >
            {this.state.error.message}
          </div>
        ) : null}
        {/* <EditIcons onDelete={this.handleDelete} entry={entry} /> */}
        <span
          css={css({
            verticalAlign: -1,
            margin: '0 6px',
            userSelect: 'none'
          })}
        >
          {displayName}
        </span>
        {isRenaming ? (
          <input
            autoFocus={true}
            type="text"
            value={name}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            css={css({
              position: 'absolute',
              top: 0,
              left: 35,
              height: 28,
              margin: 1,
              border: 0,
              background: 'rgba(0, 0, 0, .08)',
              outline: 0,
              paddingLeft: 2
            })}
          />
        ) : null}
      </div>
    )
  }

  renderTree = () => {
    const {
      entry,
      rest,
      onCreateFile,
      onOpen,
      onSelect,
      onFocus,
      onRename,
      onExpand,
      onDelete
    } = this.props

    return entry.item.type === 'folder' &&
      rest.length &&
      entry.state.isExpanded ? (
      <div css={css({ marginLeft: 16 })}>
        <FileListChildren
          parent={entry.item.path}
          entries={rest}
          onCreateFile={onCreateFile}
          onOpen={onOpen}
          onSelect={onSelect}
          onFocus={onFocus}
          onRename={onRename}
          onExpand={onExpand}
          onDelete={onDelete}
        />
      </div>
    ) : null
  }

  render() {
    const { entry, rest, onOpen, onFocus, onRename, onExpand } = this.props

    return (
      <FileListEntryBase
        entry={entry}
        rest={rest}
        onOpen={onOpen}
        onFocus={onFocus}
        onRename={onRename}
        onExpand={onExpand}
        renderItem={this.renderItem}
        renderTree={this.renderTree}
      />
    )
  }
}

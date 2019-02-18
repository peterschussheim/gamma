/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import FileListPane from './FileListPane'
import FileListOpenEntry from './FileListOpenEntry'
import FileListChildren from './FileListChildren'
import {
  renameEntry,
  selectEntry,
  openEntry,
  createNewEntry,
  closeEntry,
  updateEntry,
  expandEntry
} from '../../actions'

import { getUniquePath, isInsideFolder } from '../../utils/fileUtilities'

import { FileSystemEntry, TextFileEntry, SaveStatus } from '../CodeEditor/types'

type Props = {
  visible: boolean
  onEntriesChange: (entries: FileSystemEntry[]) => Promise<void>
  onRemoveFile: (path: string) => void
  onRenameFile: (oldPath: string, newPath: string) => void
  entries: FileSystemEntry[]
  saveStatus: SaveStatus
}

type State = {
  openFilesPane: boolean
  deleted: Array<{
    id: number
    path: string
    entries: FileSystemEntry[]
  }>
}

const AddIcon = () => (
  <g transform="translate(7.000000, 7.000000)">
    <circle fill="#4CAF50" cx="4.5" cy="4.5" r="4.5" />
    <rect fill="#FFFFFF" x="4" y="2" width="1" height="5" />
    <rect fill="#FFFFFF" x="2" y="4" width="5" height="1" />
  </g>
)

export default class FileList extends React.PureComponent<Props, State> {
  state: State = {
    openFilesPane: true,
    deleted: []
  }

  handleEntrySelect = (path: string) =>
    this.props.onEntriesChange(selectEntry(this.props.entries, path))

  handleEntryOpen = (path: string) =>
    this.props.onEntriesChange(openEntry(this.props.entries, path))

  handleEntryFocus = (path: string) =>
    this.props.onEntriesChange(openEntry(this.props.entries, path, true))

  handleEntryExpand = (path: string, expand?: boolean) =>
    this.props.onEntriesChange(expandEntry(this.props.entries, path, expand))

  handleEntryRename = (oldPath: string, newPath: string) => {
    if (oldPath !== newPath) {
      this.props.onRenameFile(oldPath, newPath)
    }

    this.props.onEntriesChange(
      renameEntry(this.props.entries, oldPath, newPath)
    )
  }

  restoreEntries = (entries: FileSystemEntry[]) =>
    this.props.onEntriesChange([
      ...this.props.entries,
      ...entries.map(e =>
        updateEntry(e, {
          item: {
            path: getUniquePath(
              this.props.entries.map(it => it.item.path),
              e.item.path
            )
          }
        })
      )
    ])

  handleDismissDelete = (id: number) =>
    this.setState(state => ({
      deleted: state.deleted.filter(g => g.id !== id)
    }))

  handleEntryClose = (path: string) =>
    this.props.onEntriesChange(
      this.props.entries.map(e => {
        if (e.item.path === path) {
          return closeEntry(e)
        }
        return e
      })
    )

  handleEntryCloseOthers = (path: string) =>
    this.props.onEntriesChange(
      this.props.entries.map(e => {
        if (e.item.path !== path) {
          return closeEntry(e)
        }
        return e
      })
    )

  handleEntryCloseAll = () =>
    this.props.onEntriesChange(this.props.entries.map(e => closeEntry(e)))

  handleEntryDelete = (path: string) => {
    const entry = this.props.entries.find(e => e.item.path === path)
    const entries: FileSystemEntry[] = []

    this.props.onEntriesChange(
      this.props.entries.filter(e => {
        const remove = e.item.path === path || isInsideFolder(e.item.path, path)
        if (remove) {
          entries.push(e)
          this.props.onRemoveFile(path)
        }
        return !remove
      })
    )

    this.setState(state => ({
      deleted: [
        ...state.deleted,
        {
          id: this.currentDeleteID++,
          path: entry ? entry.item.path : 'Item',
          entries
        }
      ]
    }))
  }

  currentDeleteID: number = 0

  handleCreateFile = (path?: string | undefined) =>
    this.props.onEntriesChange(createNewEntry(this.props.entries, 'file', path))

  handleCreateFolder = (path?: string | undefined) =>
    this.props.onEntriesChange(
      createNewEntry(this.props.entries, 'folder', path)
    )

  toggleOpenFilesPane = () =>
    this.setState(state => ({ openFilesPane: !state.openFilesPane }))

  render() {
    console.log(this.props)

    return (
      <div css={css({ display: 'flex', flexDirection: 'column' })}>
        <FileListPane
          title="Open files"
          expanded={this.state.openFilesPane}
          onClick={this.toggleOpenFilesPane}
        >
          <ul
            css={css({
              margin: 0,
              listStyle: 'none',
              padding: '8px 0',
              overflow: 'auto',

              ':empty': {
                display: 'none'
              }
            })}
            data-test-id="file-list-open-files-content"
          >
            {this.props &&
              this.props.entries
                .filter(e => e.item.type === 'file' && e.state.isOpen)
                .map((e: any) => (
                  <FileListOpenEntry
                    key={e.item.path}
                    entry={e}
                    onOpen={() => this.handleEntryOpen(e.item.path)}
                    onClose={() => this.handleEntryClose(e.item.path)}
                    onCloseOthers={() =>
                      this.handleEntryCloseOthers(e.item.path)
                    }
                    onCloseAll={this.handleEntryCloseAll}
                  />
                ))}
          </ul>
        </FileListPane>
        <FileListPane
          onClick={this.toggleOpenFilesPane}
          expanded={this.state.openFilesPane}
          css={css({ flex: 1 })}
          title="Gist"
        >
          <div
            css={css({ position: 'relative' })}
            data-test-id="file-list-gist-content"
          >
            <FileListChildren
              parent=""
              entries={this.props.entries}
              onCreateFile={this.handleCreateFile}
              onOpen={this.handleEntryOpen}
              onSelect={this.handleEntrySelect}
              onFocus={this.handleEntryFocus}
              onRename={this.handleEntryRename}
              onExpand={this.handleEntryExpand}
              onDelete={this.handleEntryDelete}
              css={css({ padding: '0 12px', height: '100%' })}
            />
          </div>
        </FileListPane>
      </div>
    )
  }
}

// container: {
//   display: 'flex',
//   flexDirection: 'column'
// },
// list: {
//   padding: '0 12px',
//   height: '100%'
// },
// pane: {
//   flex: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   width: 240,
//   minWidth: 240,
//   height: '100%',
//   zIndex: 10
// },
// project: {
//   flex: 1
// },
// files: {
//   flex: 1,
//   overflow: 'auto'
// },
// children: {
//   position: 'relative'
// },
// tabs: {
//   margin: 0,
//   listStyle: 'none',
//   padding: '8px 0',
//   overflow: 'auto',

//   ':empty': {
//     display: 'none'
//   }
// },
// toolbar: {
//   padding: 8
// },
// toasts: {
//   position: 'fixed',
//   bottom: '3em',
//   left: '1em',
//   zIndex: 10
// }

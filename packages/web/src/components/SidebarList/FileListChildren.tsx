/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import escapeRegexp from 'escape-string-regexp'
import FileListEntry from './FileListEntry'
import { isInsideFolder } from '../../utils/fileUtilities'
import { FileSystemEntry } from '../CodeEditor/types'

type Props = {
  parent: string
  entries: FileSystemEntry[]
  onOpen: (path: string) => void
  onFocus: (path: string) => void
  onSelect: (path: string) => void
  onDelete: (path: string) => void
  onExpand: (path: string, expand?: boolean) => void
  onCreateFile: (path: string | undefined) => void
  onRename: (oldPath: string, newPath: string) => void
}

export default class FileListChildren extends React.PureComponent<Props> {
  getImmediateChildren = () =>
    this.props.entries.filter(
      e =>
        // Filter-out non-immediate children
        !e.item.path
          .replace(new RegExp(`^${escapeRegexp(this.props.parent)}/`), '')
          .includes('/')
    )

  render() {
    const {
      entries,
      onCreateFile,
      onFocus,
      onOpen,
      onSelect,
      onRename,
      onExpand,
      onDelete
    } = this.props

    return (
      <div
        css={css({
          display: 'inline-block',
          width: '100%'
        })}
      >
        {this.getImmediateChildren()
          .sort((a, b) => {
            if (a.item.type === b.item.type) {
              if (a.item.path.startsWith('.') && !b.item.path.startsWith('.')) {
                return 1
              }

              if (b.item.path.startsWith('.') && !a.item.path.startsWith('.')) {
                return -1
              }

              return a.item.path.localeCompare(b.item.path)
            } else if (a.item.type === 'folder') {
              return -1
            } else {
              return 1
            }
          })
          .map(e => (
            <FileListEntry
              key={e.item.path}
              entry={e}
              rest={entries.filter(en =>
                isInsideFolder(en.item.path, e.item.path)
              )}
              onCreateFile={onCreateFile}
              onOpen={onOpen}
              onSelect={onSelect}
              onFocus={onFocus}
              onDelete={onDelete}
              onRename={onRename}
              onExpand={onExpand}
              getAdjacentEntries={this.getImmediateChildren}
            />
          ))}
      </div>
    )
  }
}

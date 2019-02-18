import * as React from 'react'

import EditableText from '../EditableText'
import { FileListContainer, SidebarContainer } from './elements'
import { ListItem } from '../ListItems/elements'
import { Icon } from '../Icon'
import { isFileDirty } from '../../utils/isGistDirty'
import { EditorContext } from '../CodeEditor/EditorProvider'
import { TextFileEntry, FileSystemEntry, SaveStatus } from '../CodeEditor/types'
import { DirtyIndicator } from './DirtyIndicator'

const styles = {
  description: {
    input: {
      fontSize: 7,
      margin: '0px 15px 5px 5px',
      color: '#E6ECF1',
      backgroundColor: '#233C51',
      outline: '1px dotted #e73'
    },
    view: {
      fontSize: 11,
      margin: '0px 15px 5px 5px',
      color: 'white',
      outline: '1px dotted #e73',
      cursor: 'pointer'
    }
  },
  filename: {
    input: {
      fontSize: 8,
      minWidth: '10em',
      color: '#E6ECF1',
      backgroundColor: '#233C51'
    },
    view: {
      display: 'flex',
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: '1px 2px 3px 5px'
    }
  }
}

type Props = {
  visible: boolean
  loading: boolean
  isCreating?: boolean
  onOpenPath: (path: string) => void
  onEntriesChange: (entries: FileSystemEntry[]) => Promise<void>
  onRemoveFile: (path: string) => void
  onRenameFile: (oldPath: string, newPath: string) => void
  preventRedirectWarning: () => void
  entries: FileSystemEntry[]
  saveStatus: SaveStatus
  description?: string
  showModal?: boolean
}

type State = {
  deleted: Array<{
    id: number
    path: string
    entries: FileSystemEntry[]
  }>
}

class GistFilesList extends React.Component<Props, State> {
  isCreating: boolean
  static contextType = EditorContext

  constructor(props: Props) {
    super(props)
    this.isCreating = this.props.isCreating
    this.state = {
      deleted: []
    }
  }

  render() {
    console.log(this.props)
    const { data, description, isCreating } = this.props
    if (!isCreating) {
      return (
        <FileListContainer>
          <SidebarContainer>
            <EditableText
              onSave={e => this.props.onDescriptionChange(e)}
              value={data.description}
              inputProps={{
                placeholder: 'Enter a description',
                style: styles.description.input
              }}
              viewProps={{
                style: styles.description.view
              }}
            />
            {data.files.map(file => {
              const dirty = isFileDirty(this.context.values.changes, file)
              const isActive =
                this.context.values.currentFilename === file.filename
              return (
                <ListItem
                  active={isActive}
                  onClick={() => this.props.onOpenPath(file.filename)}
                  key={file.filename}
                >
                  <Icon
                    onClick={() => this.props.onOpenPath(file.filename)}
                    height={12}
                    marginTop={2}
                    marginRight={2}
                    filename={file.filename}
                  />{' '}
                  <EditableText
                    onSave={e => this.props.onFilenameChange(e)}
                    value={file.filename}
                    inputProps={{
                      placeholder: 'Filename including extension',
                      style: styles.filename.input
                    }}
                    viewProps={{
                      style: styles.filename.view
                    }}
                  />
                  <DirtyIndicator isDirty={dirty} />
                </ListItem>
              )
            })}
          </SidebarContainer>
        </FileListContainer>
      )
    } else {
      // we are creating a new gist

      return (
        <FileListContainer>
          <SidebarContainer>
            <EditableText
              onSave={e => this.props.onDescriptionChange(e)}
              value={data.description}
              inputProps={{
                placeholder: 'Enter a description',
                style: styles.description.input
              }}
              viewProps={{
                style: styles.description.view
              }}
            />

            {this.context.values.changes &&
              this.context.values.changes.map(file => {
                const dirty = isFileDirty(this.context.values.changes, file)
                const isActive =
                  this.context.values.currentFilename === file.filename
                return (
                  <ListItem
                    active={isActive}
                    onClick={() => this.handleOpenPath(file.filename)}
                    key={file.filename}
                  >
                    <Icon
                      onClick={() => this.handleOpenPath(file.filename)}
                      height={12}
                      filename={file.filename}
                    />{' '}
                    <EditableText
                      onSave={e => this.props.onFilenameChange(e)}
                      value={file.filename}
                      inputProps={{
                        placeholder: 'Filename including extension',
                        style: styles.filename.input
                      }}
                      viewProps={{
                        style: styles.filename.view
                      }}
                    />
                    <DirtyIndicator isDirty={dirty} />
                  </ListItem>
                )
              })}
          </SidebarContainer>
        </FileListContainer>
      )
    }
  }
}

export default GistFilesList

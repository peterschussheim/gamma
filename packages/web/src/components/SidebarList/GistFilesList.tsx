import * as React from 'react'

import EditableText from '../EditableText'
import { FileListContainer, SidebarContainer } from './elements'
import { Description, ListItem } from '../ListItems/elements'
import { Icon } from '../icon'
import { isFileDirty } from '../../utils/isGistDirty'
import EditIcons from '../EditIcons'

type Props = {
  handleResetStore(): void
  handleOpenPath(path: string): void
  handleDescriptionChange(description: string): void
  /** Signals that we are rendering data from `EditorProvider`, not apollo */
  isCreating: boolean
  loading: boolean
  data?: any
  /** Description of this Gist */
  description?: string
  changes?: {
    [filename: string]: string
  }
}

type IndicatorProps = {
  isDirty: boolean
}

const DirtyIndicator: React.FunctionComponent<IndicatorProps> = props => {
  return (
    <span style={{ float: 'right', color: 'magenta', fontWeight: 'bold' }}>
      {props.isDirty ? 'M' : null}
    </span>
  )
}

class GistFilesList extends React.Component<Props> {
  isCreating: boolean
  constructor(props) {
    super(props)
    this.isCreating = this.props.isCreating
    this.state = {
      itemState: props.itemState || '',
      error: false,
      selected: false,
      hovering: false
    }
  }
  componentDidMount() {
    if (this.isCreating) {
      const { loading } = this.props.data
      if (loading || !this.props.data.getGistById) {
        return
      } else if (this.props.data.getGistById !== undefined) {
        this.props.handleOpenPath(this.props.data.getGistById.files[0].filename)
      } else {
        return
      }
    } else {
      return
    }
  }

  componentWillUnmount() {
    // hack to clear the editor state when navigating away from a gist
    this.props.handleResetStore()
  }

  // setCurrentModule = () => this.props.handleOpenPath(this.props.currentFilename)

  onMouseEnter = () => this.setState({ hovering: true })
  onMouseLeave = () => this.setState({ hovering: false })

  render() {
    const {
      data,
      description,
      changes,
      handleOpenPath,
      handleDescriptionChange,
      isCreating
    } = this.props
    if (!isCreating) {
      const { loading } = data
      if (loading || !data) {
        return null
      } else {
        return (
          <FileListContainer>
            <SidebarContainer>
              <Description>
                {data.getGistById.description || '[no description]'}
              </Description>
              {data.getGistById.files.map(file => {
                const dirty = isFileDirty(changes, file)

                return (
                  <ListItem
                    onClick={() => handleOpenPath(file.filename)}
                    key={file.filename}
                  >
                    <Icon
                      onClick={() => handleOpenPath(file.filename)}
                      height={12}
                      filename={file.filename}
                    />{' '}
                    {file.filename} <DirtyIndicator isDirty={dirty} />
                  </ListItem>
                )
              })}
            </SidebarContainer>
          </FileListContainer>
        )
      }
    } else {
      // we are creating a new gist
      // set some default state for new gists:
      const newGist = {
        description: 'CHANGE ME!',
        files: [
          {
            filename: 'index.ts',
            content: `class Greeter<T> {
            greeting: T;
            constructor(message: T) {
                this.greeting = message;
            }
            greet() {
                return this.greeting;
            }
        }
        
        let greeter = new Greeter<string>("Hello, world");
        
        let button = document.createElement('button');
        button.textContent = "Say Hello";
        button.onclick = function() {
            alert(greeter.greet());
        }
        
        document.body.appendChild(button);`
          }
        ]
      }
      return (
        <FileListContainer>
          <SidebarContainer>
            <EditableText
              onSave={() => console.log('onSave')}
              value={newGist.description}
              inputProps={{
                placeholder: 'Enter a description',
                style: {
                  fontSize: 7,
                  margin: '0px 15px 5px 5px',
                  color: '#E6ECF1',
                  backgroundColor: '#233C51',
                  outline: '1px dotted #e73'
                }
              }}
              viewProps={{
                style: {
                  fontSize: 11,
                  margin: '0px 15px 5px 5px',
                  color: 'white',
                  outline: '1px dotted #e73',
                  cursor: 'auto'
                }
              }}
            />

            {data.files.map(file => {
              const dirty = isFileDirty(changes, file)

              return (
                <ListItem
                  onClick={() => handleOpenPath(newGist.files[0].filename)}
                  key={newGist.files[0].filename}
                >
                  <Icon
                    onClick={() => handleOpenPath(newGist.files[0].filename)}
                    height={12}
                    filename={newGist.files[0].filename}
                  />{' '}
                  <EditableText
                    onSave={() => console.log('onSave')}
                    value={newGist.files[0].filename}
                    inputProps={{
                      placeholder: 'Enter a description',
                      style: {
                        fontSize: 7,
                        margin: '0px 15px 5px 5px',
                        color: '#E6ECF1',
                        backgroundColor: '#233C51',
                        outline: '1px dotted #e73'
                      }
                    }}
                    viewProps={{
                      style: {
                        fontSize: 11,
                        minWidth: 10,
                        margin: '0px 0px 0px 0px',
                        color: 'white',
                        outline: '1px dotted #e73',
                        cursor: 'auto'
                      }
                    }}
                  />
                  <EditIcons
                    hovering={this.state.hovering}
                    onCreateFile={() => console.log('onCreateFile')}
                    onEdit={() => console.log('onEdit')}
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

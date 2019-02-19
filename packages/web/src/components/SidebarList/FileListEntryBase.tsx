/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'
import { FileSystemEntry } from '../CodeEditor/types'
import { ListItem } from '../ListItems/elements'
import { Icon } from '../Icon'

type Props = {
  entry: FileSystemEntry
  rest: FileSystemEntry[]
  onOpen: (path: string) => void
  onFocus: (path: string) => void
  onRename: (oldPath: string, newPath: string) => void
  onExpand?: (path: string, expand?: boolean) => void
  renderItem: () => React.ReactNode
  renderTree?: () => React.ReactNode
}

type State = {
  isHovered: boolean
}

export default class FileListEntry extends React.Component<Props, State> {
  state = {
    isHovered: false
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).tagName === 'INPUT') {
      return
    }

    this.props.onOpen(this.props.entry.item.path)
  }

  handleMouseEnter = () =>
    this.setState({
      isHovered: true
    })

  handleMouseLeave = () =>
    this.setState({
      isHovered: false
    })

  handleMouseDown = () => (this.click = true)

  handleFocus = () => {
    if (this.click) {
      // The focus was triggered by a click event
      // Ignore it to avoid double handling
      this.click = false
      return
    }

    this.props.onFocus(this.props.entry.item.path)
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).tagName === 'INPUT') {
      return
    }
  }

  click: boolean = false
  item = React.createRef<HTMLDivElement>()
  more = React.createRef<HTMLButtonElement>()

  render() {
    const { entry, rest, onRename } = this.props
    const { isHovered } = this.state

    return (
      <React.Fragment>
        <ListItem
          css={css({
            position: 'relative',
            // display: 'inline-block',
            // padding: '4px 16px',
            outline: 0,
            width: '100%',
            cursor: 'pointer',
            zIndex: 1,
            whiteSpace: 'nowrap'
          })}
          ref={this.item}
          tabIndex={0}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        >
          <Icon
            onClick={this.handleClick}
            height={12}
            marginTop={2}
            marginRight={2}
            filename={entry.item.path}
          />
          {this.props.renderItem()}
        </ListItem>
        {this.props.renderTree && this.props.renderTree()}
      </React.Fragment>
    )
  }
}

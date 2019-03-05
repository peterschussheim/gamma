/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'
import { FileSystemEntry } from '../CodeEditor/types'
import { ListItem } from '../ListItems/elements'
import { Icon } from '../Icon'
import ContextMenu from '../ContextMenu'
// tslint:disable-next-line: no-duplicate-imports
import { Action } from '../ContextMenu'

type Props = {
  entry: FileSystemEntry
  rest: FileSystemEntry[]
  onOpen: (path: string) => void
  onFocus: (path: string) => void
  onRename: (oldPath: string, newPath: string) => void
  onExpand?: (path: string, expand?: boolean) => void
  renderItem: () => React.ReactNode
  renderTree?: () => React.ReactNode
  actions: Array<Action | undefined>
  dirty: boolean
}

type State = {
  menu: {
    pageX: number
    pageY: number
  } | null
  isHovered: boolean
}

export default class FileListEntryBase extends React.Component<Props, State> {
  click: boolean = false
  item = React.createRef<HTMLDivElement>()
  more = React.createRef<HTMLButtonElement>()
  menu = React.createRef<HTMLUListElement>()

  state = {
    menu: null,
    isHovered: false
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
    document.addEventListener('contextmenu', this.handleDocumentContextMenu)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
    document.removeEventListener('contextmenu', this.handleDocumentContextMenu)
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

  hideContextMenu = () => this.setState({ menu: null })

  showContextMenu = (e: MouseEvent) => {
    this.setState({
      menu: {
        pageX: e.pageX,
        pageY: e.pageY
      }
    })
  }

  handleDocumentClick = (e: MouseEvent) => {
    if (this.state.menu) {
      if (
        this.menu.current &&
        e.target !== this.menu.current &&
        !this.menu.current.contains(e.target as HTMLElement)
      ) {
        this.hideContextMenu()
      }
    } else if (
      this.more.current &&
      (e.target === this.more.current ||
        this.more.current.contains(e.target as Node))
    ) {
      if (this.state.menu) {
        this.hideContextMenu()
      } else {
        this.showContextMenu(e)
      }
    }
  }

  handleDocumentContextMenu = (e: MouseEvent) => {
    if (
      e.target === this.item.current ||
      (this.item.current && this.item.current.contains(e.target as Node))
    ) {
      e.preventDefault()
      this.showContextMenu(e)
    } else if (this.state.menu) {
      this.hideContextMenu()
    }
  }

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

  render() {
    const { entry, rest, onRename, actions } = this.props
    const { menu, isHovered } = this.state

    return (
      <React.Fragment>
        <ListItem
          css={{
            position: 'relative',
            // display: 'inline-block',
            // padding: '4px 16px',
            outline: 0,
            width: '100%',
            cursor: 'pointer',
            zIndex: 1,
            whiteSpace: 'nowrap'
          }}
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
        <ContextMenu
          ref={this.menu}
          visible={Boolean(menu)}
          position={menu}
          actions={actions}
          onHide={this.hideContextMenu}
        />
        {this.props.renderTree && this.props.renderTree()}
      </React.Fragment>
    )
  }
}

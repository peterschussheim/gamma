/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import { TextFileEntry } from '../CodeEditor/types'
import { Icon } from '../Icon'

type Props = {
  entry: TextFileEntry
  onOpen: () => void
  onClose: () => void
  onCloseOthers: () => void
  onCloseAll: () => void
}

type State = {
  isHovered: boolean
}

export default class FileListOpenEntry extends React.PureComponent<
  Props,
  State
> {
  state: State = {
    isHovered: false
  }

  handleMouseEnter = () =>
    this.setState({
      isHovered: true
    })

  handleMouseLeave = () =>
    this.setState({
      isHovered: false
    })

  item = React.createRef<HTMLLIElement>()

  render() {
    const { entry } = this.props
    const displayName = entry.item.path.split('/').pop()

    return (
      <li
        ref={this.item}
        tabIndex={-1}
        css={css([
          {
            paddingLeft: 24,
            cursor: 'pointer',
            outline: 0,
            whiteSpace: 'nowrap'
          },
          entry.state.isFocused && {
            backgroundColor: 'rgba(255, 255, 255, .04)'
          }
        ])}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <button
          onClick={this.props.onClose}
          css={css([
            {
              padding: '7px 8px',
              fontSize: '18px',
              border: 'none',
              appearance: 'none',
              position: 'absolute',
              left: 0,
              margin: '-3px 0 0 0',
              background: 'none',
              outline: 0
            },
            this.state.isHovered
              ? { opacity: 1, color: 'white' }
              : { opacity: 0 }
          ])}
        >
          ×
        </button>
        <div onClick={this.props.onOpen}>
          <Icon filename={entry} />
          <span
            css={css({
              display: 'inline-block',
              verticalAlign: -1,
              margin: 6,
              userSelect: 'none',
              whiteSpace: 'nowrap'
            })}
          >
            {displayName}
          </span>
        </div>
      </li>
    )
  }
}

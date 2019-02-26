/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

type Props = {
  innerRef?: React.Ref<HTMLButtonElement>
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

class FileListPaneButton extends React.PureComponent<Props> {
  render() {
    const { innerRef, ...rest } = this.props

    return (
      <button
        {...rest}
        css={css({
          appearance: 'none',
          background: 'transparent',
          border: 0,
          margin: 0,
          outline: 0
        })}
        ref={innerRef}
      >
        <svg
          css={css({
            fill: 'currentColor',
            height: 16,
            width: 16,
            verticalAlign: -3
          })}
          viewBox="0 0 16 16"
        >
          {this.props.children}
        </svg>
      </button>
    )
  }
}

export default React.forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => (
    <FileListPaneButton {...props} innerRef={ref} />
  )
)

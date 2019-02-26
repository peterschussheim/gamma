// tslint:disable: no-unused-expression
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

type Props = {
  onResize: () => void
  children: React.ReactNode
}

export default class ResizeDetector extends React.Component<Props> {
  componentDidMount() {
    const horiz = this.horizontal.current
    const verti = this.vertical.current

    horiz &&
      horiz.contentWindow &&
      horiz.contentWindow.addEventListener('resize', this.handleResize)

    verti &&
      verti.contentWindow &&
      verti.contentWindow.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    const horiz = this.horizontal.current
    const verti = this.vertical.current

    horiz &&
      horiz.contentWindow &&
      horiz.contentWindow.removeEventListener('resize', this.handleResize)

    verti &&
      verti.contentWindow &&
      verti.contentWindow.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => this.props.onResize()

  horizontal = React.createRef<HTMLIFrameElement>()
  vertical = React.createRef<HTMLIFrameElement>()

  render() {
    return (
      <div css={css(container)}>
        {/* pointer-events: none is not working properly on EDGE, so we render 2 iframes to detect resize instead of one iframe covering the entire editor */}
        <iframe ref={this.horizontal} css={css([phantom, horizontal])} />
        <iframe ref={this.vertical} css={css([phantom, vertical])} />
        {this.props.children}
      </div>
    )
  }
}

const container = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  minWidth: 0,
  minHeight: 0,
  position: 'relative'
})

const phantom = css({
  display: 'block',
  position: 'absolute',
  left: 0,
  top: 0,
  pointerEvents: 'none',
  opacity: 0
})

const horizontal = css({
  height: 1,
  width: '100%'
})

const vertical = css({
  height: '100%',
  width: 1
})

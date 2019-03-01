/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

type Props = {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
  className?: string
}

type State = {
  resizing: boolean
  initialPosition: {
    pageX: number
    pageY: number
  } | null
  initialWidth: number
  initialHeight: number
}

export default class ResizablePane extends React.PureComponent<Props, State> {
  state: State = {
    resizing: false,
    initialPosition: null,
    initialWidth: 0,
    initialHeight: 0
  }

  componentDidMount() {
    // @ts-ignore
    document.addEventListener('mouseup', this.handleMouseUp)
    // @ts-ignore
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    // @ts-ignore
    document.removeEventListener('mouseup', this.handleMouseUp)
    // @ts-ignore
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!this.pane.current) {
      return
    }

    const style = getComputedStyle(this.pane.current)
    this.setState({
      resizing: true,
      initialPosition: {
        pageX: e.pageX,
        pageY: e.pageY
      },
      initialWidth: parseFloat(style.width || '0'),
      initialHeight: parseFloat(style.height || '0')
    })
  }

  handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.resizing) {
      e.preventDefault()
      this.setState({
        resizing: false,
        initialPosition: null,
        initialWidth: 0,
        initialHeight: 0
      })
    }
  }

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { direction } = this.props
    const {
      resizing,
      initialPosition,
      initialWidth,
      initialHeight
    } = this.state

    if (resizing && initialPosition) {
      e.preventDefault()

      let style

      if (direction === 'horizontal') {
        style = css(
          `width: ${initialWidth +
            e.pageX -
            initialPosition.pageX}px !important;`
        )
      } else {
        style = css(
          `height: ${initialHeight -
            e.pageY +
            initialPosition.pageY}px !important`
        )
      }
      // tslint:disable-next-line: no-unused-expression
      this.pane.current && this.pane.current.setAttribute('style', style)
    }
  }

  pane = React.createRef<HTMLDivElement>()

  render() {
    return (
      <div
        ref={this.pane}
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: 240,
          minWidth: 240,
          height: '100%',
          zIndex: 10,
          color: 'white',
          position: 'relative'
        }}
      >
        {this.props.children}
        <div
          css={[
            {
              color: '#F0F0F0',
              position: 'absolute',
              zIndex: 1
            },
            this.props.direction === 'horizontal'
              ? {
                  right: -12,
                  top: 0,
                  bottom: 0,
                  width: 12,
                  cursor: 'col-resize'
                }
              : {
                  top: -12,
                  left: 0,
                  right: 0,
                  height: 12,
                  cursor: 'row-resize'
                }
          ]}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    )
  }
}

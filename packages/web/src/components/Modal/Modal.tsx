/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  visible: boolean
  children?: React.ReactNode
  onDismiss?: () => void
}

type State = {
  rendered: boolean
}

export default class Modal extends React.PureComponent<Props, State> {
  container = document.createElement('div')
  content = React.createRef<HTMLDivElement>()
  timer: any
  static getDerivedStateFromProps(props: Props) {
    if (props.visible) {
      return {
        rendered: true
      }
    }

    return null
  }

  state = {
    rendered: this.props.visible
  }

  componentDidMount() {
    document.body.appendChild(this.container)
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible !== prevProps.visible) {
      clearTimeout(this.timer)

      if (!this.props.visible) {
        this.timer = setTimeout(() => this.setState({ rendered: false }), 300)
      }
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      this.content.current &&
      this.content.current !== e.target &&
      this.content.current.contains(e.target as Node)
    ) {
      return
    }

    this.props.onDismiss && this.props.onDismiss()
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 27 && this.props.visible) {
      // Esc was pressed
      e.preventDefault()
      this.props.onDismiss && this.props.onDismiss()
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div
        css={[modal, this.props.visible ? visible : hidden]}
        onClick={this.handleDismiss}
      >
        <div ref={this.content} css={content}>
          {this.state.rendered ? this.props.children : null}
        </div>
      </div>,
      this.container
    )
  }
}

const modal = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(24, 29, 37, 0.8)',
  color: '#fff',
  zIndex: 999,
  transitionDuration: '200ms'
})

const content = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const visible = css({
  opacity: 1,
  pointerEvents: 'auto'
})

const hidden = css({
  opacity: 0,
  pointerEvents: 'none'
})

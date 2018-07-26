import * as React from 'react'

export type TDevToolsProps = {
  host: string
  secure?: boolean
  sessionId: string
}

export class DevTools extends React.Component<TDevToolsProps> {
  public static defaultProps: Partial<TDevToolsProps> = {
    secure: true,
  }

  public el: HTMLElement

  constructor(props: TDevToolsProps) {
    super(props)
    this.onWrapperElementAvailable = this.onWrapperElementAvailable.bind(this)
  }

  shouldComponentUpdate(nextProps: TDevToolsProps) {
    return nextProps.sessionId !== this.props.sessionId
  }

  componentDidUpdate() {
    this.renderIframe()
  }

  componentDidMount() {
    this.renderIframe()
  }

  getIframeSrc() {
    const { secure, host, sessionId } = this.props
    return `https://cloudflareworkers.com/devtools/inspector.html?ws${
      secure ? 's' : ''
    }=${host}/inspect/${sessionId}&v8only=true`
  }

  renderIframe() {
    const existingIframe = this.el.querySelector('iframe')
    const url = this.getIframeSrc()

    if (existingIframe && existingIframe.src === url) {
      return
    }

    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.style.flex = '1'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.border = 'none'
    iframe.style.borderTop = 'solid 1px #ccc'

    if (existingIframe) {
      this.el.replaceChild(iframe, existingIframe)
    } else {
      this.el.appendChild(iframe)
    }
  }

  render() {
    return (
      <div
        data-src={this.getIframeSrc()}
        ref={this.onWrapperElementAvailable}
        style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}
      />
    )
  }

  onWrapperElementAvailable(el: HTMLElement) {
    this.el = el
  }
}

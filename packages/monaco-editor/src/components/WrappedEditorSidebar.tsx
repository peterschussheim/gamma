import * as React from 'react'
import { Input } from 'cf-component-input'
import { Button, ButtonGroup } from 'cf-component-button'
import { WrappedEditor } from './WrappedEditor'
import { FlexPassthrough, EditorWrapper } from './common'
import { KeyboardEventListener } from '../lib/KeyboardEventListener'
import logoUrl from '../assets/logo.svg'
import {
  SidebarModulePadding,
  SidebarAltTheme,
  SidebarDarkTheme,
  SidebarRaised,
  ButtonHotKey,
} from './FiddleSidebarModules'

export interface IFiddleSidebarProps {
  editorValue: string
  editorDidMount?: (
    editor: monaco.editor.ICodeEditor,
    code: typeof monaco,
  ) => void
  isMacOs: boolean
  scriptId: string
  previewUrl: string
  shareUrl: string
  hideOverflow: boolean
  requestSave: () => void
}

export type TFiddleSidebarState = {
  isShareModuleOpen: boolean
}

export class FiddleSidebar extends React.Component<
  IFiddleSidebarProps,
  TFiddleSidebarState
> {
  public keyboard: KeyboardEventListener

  constructor(props: IFiddleSidebarProps) {
    super(props)

    this.state = {
      isShareModuleOpen: false,
    }

    this.onShareClick = this.onShareClick.bind(this)
    this.onShareInputFocus = this.onShareInputFocus.bind(this)
    this.onShareInputRefAvailable = this.onShareInputRefAvailable.bind(this)
  }

  componentWillUnmount() {
    if (this.keyboard) {
      this.keyboard.stop()
    }
  }

  render() {
    const cfwrk = encodeURIComponent(
      [this.props.scriptId, this.props.previewUrl].join(':').substring(0, 99),
    )

    return (
      <FlexPassthrough direction="column">
        <div>
          <SidebarModulePadding>
            <div style={{ display: 'inline-block', width: '100px' }}>
              <img src={logoUrl} />
            </div>
          </SidebarModulePadding>
        </div>
        <div>
          <SidebarModulePadding>
            <p>
              Transform requests on the edge using JavaScript.
              <br />
              <a href="https://cloudflare.com/products/cloudflare-workers/?cfwrk=a9bc9ef6b4248289c71518581df30bc7%3Ahttps%3A%2F%2Ftutorial.cloudflareworkers.com">
                Learn more about Cloudflare Workers
              </a>
            </p>
          </SidebarModulePadding>
        </div>
        <EditorWrapper hideOverflow={this.props.hideOverflow}>
          <FiddleEditor
            value={this.props.editorValue}
            editorDidMount={this.props.editorDidMount}
          />
        </EditorWrapper>
        {this.state.isShareModuleOpen && (
          <SidebarRaised>
            <SidebarAltTheme>
              <SidebarModulePadding>
                <input
                  readOnly={true}
                  value={this.props.shareUrl}
                  type="text"
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: 'auto',
                    margin: '0',
                    padding: '0.5rem',
                    fontSize: '0.8rem',
                    outline: 'none',
                  }}
                  onFocus={this.onShareInputFocus}
                  ref={this.onShareInputRefAvailable}
                />
              </SidebarModulePadding>
            </SidebarAltTheme>
          </SidebarRaised>
        )}
        <div style={{ textAlign: 'right' }}>
          <SidebarAltTheme>
            <SidebarModulePadding>
              <ButtonGroup spaced={true}>
                <Button type="primary" onClick={this.props.requestSave}>
                  Update{' '}
                  <ButtonHotKey>
                    ({this.props.isMacOs ? '⌘' : 'ctrl+'}s)
                  </ButtonHotKey>
                </Button>
                <Button type="default" onClick={this.onShareClick}>
                  Share
                </Button>
              </ButtonGroup>
            </SidebarModulePadding>
          </SidebarAltTheme>
        </div>
      </FlexPassthrough>
    )
  }

  onShareClick() {
    this.setState({
      isShareModuleOpen: !this.state.isShareModuleOpen,
    })
  }

  onShareInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    ;(e.target as HTMLInputElement).select()
  }

  onShareInputRefAvailable(el: HTMLInputElement) {
    if (!el && this.keyboard) {
      this.keyboard.stop()
      return
    }

    el.select()

    this.keyboard = new KeyboardEventListener({
      target: el,
      preventDefault: false,
    })

    const onClose = () => {
      // Settimeout because otherwise copying doesn't work
      setTimeout(() => {
        el.value = 'Copied!'
      }, 10)

      setTimeout(() => {
        this.setState({
          isShareModuleOpen: false,
        })
      }, 1000)
    }

    this.keyboard.on('cmd+c', onClose)
    this.keyboard.on('ctrl+c', onClose)
    this.keyboard.on('escape', onClose)

    this.keyboard.listen()
  }
}

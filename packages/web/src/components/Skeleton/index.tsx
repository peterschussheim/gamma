/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'
import SplitPane from 'react-split-pane'

type Props = {
  sidebar: React.ReactNode
  editor: React.ReactNode
  footer: React.ReactNode
}

export default class Skeleton extends React.Component<Props> {
  render() {
    const { sidebar, editor, footer } = this.props

    return (
      <React.Fragment>
        <div css={container}>
          <div css={leftPanel}>{sidebar}</div>
          <div css={rightPanel}>{editor}</div>
        </div>
        <div>{footer}</div>
      </React.Fragment>
    )
  }
}

const container = css`
  display: flex;
  min-height: 500px;
  min-width: 800px;
`
const leftPanel = css`
  flex: 1;
  overflow: auto;
  background-color: #001023;
`
const rightPanel = css`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  flex: 3;
`

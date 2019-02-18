/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import ModalSheet, { ModalSheetProps } from './ModalSheet'

type Props = ModalSheetProps & {
  title?: string
  autoSize?: boolean
}

export default function ModalDialog(props: Props) {
  const { title, children, ...rest } = props

  return (
    <ModalSheet {...rest} css={props.autoSize !== false && small}>
      {title ? <div css={titleClass}>{title}</div> : null}
      <div css={css(title ? bottom : content)}>{children}</div>
    </ModalSheet>
  )
}

const small = css({
  minWidth: 360,
  minHeight: 0,
  maxWidth: 420,
  maxHeight: 'calc(100% - 100px)'
})
const titleClass = css({
  height: 72,
  fontSize: 24,
  width: '100%',
  lineHeight: '24px',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 0 rgba(36, 44, 58, 0.1)'
})
const bottom = css({
  padding: '16px 24px 24px 24px',
  overflow: 'auto'
})
const content = css({
  padding: 24,
  overflow: 'auto'
})

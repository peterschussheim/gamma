/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import Modal from './Modal'

export type ModalSheetProps = {
  visible: boolean
  onDismiss: () => void
  children: React.ReactNode
}

export default function ModalSheet(props: ModalSheetProps) {
  return (
    <Modal visible={props.visible} onDismiss={props.onDismiss}>
      <div css={[modal, contentDark]}>
        {props.onDismiss ? (
          <button
            css={close}
            onClick={props.onDismiss}
            data-test-id="modal-close"
          >
            ✕
          </button>
        ) : null}
        {props.children}
      </div>
    </Modal>
  )
}

const modal = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  textAlign: 'center',
  borderRadius: 4,
  boxShadow: '0 1px 4px rgba(36, 44, 58, 0.3)'
})

const close = css({
  appearance: 'none',
  borderRadius: '1em',
  outline: 0,
  padding: 0,
  position: 'absolute',
  right: '-1em',
  top: '-1em',
  width: '2em',
  height: '2em',
  background: '#0E2840',
  border: `2px solid #F6F8FA`,
  boxShadow: '0 1.5px 3px rgba(0, 0, 0, .16)',
  color: 'white',
  fontSize: '1em',
  fontWeight: 'bold',
  textAlign: 'center'
})

const contentDark = css({
  backgroundColor: '#6E8090',
  color: '#8598A7',
  border: `1px solid #F6F8FA`
})

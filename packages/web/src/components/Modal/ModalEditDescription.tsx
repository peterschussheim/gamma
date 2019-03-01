/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

import { DefaultButton } from '../Buttons'
import ModalDialog from './ModalDialog'

type Props = {
  title: string
  visible: boolean
  action: string
  onSave: (description: string) => void
  onDismiss: () => void
  description: string | undefined
  loading?: boolean
}

type State = {
  description: string
  visible: boolean
}

export default class ModalEditDescription extends React.Component<
  Props,
  State
> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.visible !== props.visible) {
      if (props.visible) {
        return {
          description: props.description || '',
          visible: props.visible
        }
      } else {
        return { visible: props.visible }
      }
    }

    return null
  }

  state = {
    description: this.props.description || '',
    visible: this.props.visible
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSave(this.state.description)
  }

  validateDescription = (description: string) =>
    description
      ? /^[a-z_\-\d\s]+$/i.test(description)
        ? null
        : new Error(
            // tslint:disable-next-line:max-line-length
            'Description can only contain letters, numbers, space, hyphen (-) and underscore (_).'
          )
      : new Error('Description cannot be empty.')

  render() {
    const { visible, title, onDismiss, loading, action } = this.props

    return (
      <ModalDialog visible={visible} title={title} onDismiss={onDismiss}>
        <form onSubmit={this.handleSubmit}>
          <h4 css={subtitle}>Description</h4>
          <input
            type="text"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder={''}
          />
          <div css={buttons}>
            <DefaultButton type="button">{action}</DefaultButton>
          </div>
        </form>
      </ModalDialog>
    )
  }
}

const subtitle = css({
  fontSize: 16,
  fontWeight: 500,
  padding: 0,
  lineHeight: '22px',
  margin: '16px 0 6px 0'
})

const buttons = css({
  margin: '20px 0 0 0'
})

const caption = css({
  marginTop: 24,
  fontSize: '16px',
  lineHeight: '22px',
  textAlign: 'center'
})

const link = css({
  cursor: 'pointer',
  color: '#0E2840',
  textDecoration: 'underline'
})

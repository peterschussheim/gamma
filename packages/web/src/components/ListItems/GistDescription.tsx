/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as React from 'react'

import EditIcons from '../EditIcons'
import { EditorContext } from '../CodeEditor/EditorProvider'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    position: 'relative'
  },
  field: {
    display: 'inline-block',
    color: 'white',
    borderStyle: 'dotted',
    borderWidth: 'thin',
    borderColor: '#ffffff00',
    margin: 0,
    backgroundColor: '#233C51',
    outline: '1px dotted #e73',
    padding: '1px 6px'
  },
  editable: {
    position: 'absolute',
    appearance: 'none',
    background: 'none',
    outline: 0,
    border: 0,
    left: 0,
    width: '100%',
    borderRadius: 0,

    ':focus': {
      boxShadow: `inset 0 0 0 3px green`
    },

    ':hover:focus': {
      boxShadow: `inset 0 0 0 1px #0e2840`
    }
  },
  phantom: {
    display: 'inline-block',
    maxWidth: '100%',
    pointerEvents: 'none',
    whiteSpace: 'pre',
    overflow: 'hidden',
    opacity: 0
  }
}

type Props = {
  handleDescriptionChange?(description: string): void
  handleCancel?(description: string): void
  /** Signals that we are rendering data from `EditorProvider`, not apollo */
  isCreating: boolean
  loading: boolean
  /** Description of this Gist */
  initialDescription?: string
}

type State = {
  value: string
  elementState: 'editing' | 'modified' | 'saved' | 'unmodified'
  hovering: boolean
}

class GistDescription extends React.Component<Props, State> {
  isCreating: boolean
  static contextType = EditorContext
  constructor(props: Props) {
    super(props)
    this.isCreating = props.isCreating
    this.state = {
      value: props.initialDescription || '',
      elementState: 'unmodified',
      hovering: false
    }
  }

  handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ value: e.target.value })

  onMouseEnter = () => this.setState({ hovering: true })
  onMouseLeave = () => this.setState({ hovering: false })

  rename = () => {
    this.setState({ elementState: 'editing' })
    return true // To close it
  }

  render() {
    const { isCreating } = this.props
    const active = this.state.elementState === 'editing' ? true : false
    return (
      <div style={styles.container}>
        <div style={{ ...styles.field, ...styles.phantom }}>
          {this.state.value.replace(/\n/g, '')}
          &nbsp;
        </div>
        <input
          autoFocus={active}
          style={styles.editable}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onChange={this.handleChangeText}
          value={this.state.value}
        />
        <EditIcons
          onEdit={this.rename}
          hovering={this.state.hovering}
          active={active}
        />
      </div>
    )
  }
}

export default GistDescription

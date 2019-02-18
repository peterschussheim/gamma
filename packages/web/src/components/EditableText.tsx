import * as React from 'react'
import PropTypes from 'prop-types'
// @ts-ignore
import styles from './styles.module.css'
import classnames from 'classnames'

import { HtmlAttributes } from 'csstype'

type InputType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'month'
  | 'url'
  | 'week'
  | 'tel'

type InputProps = React.InputHTMLAttributes<HtmlAttributes>

interface ViewProps {
  style?: React.CSSProperties
  className?: string
}

interface Props {
  type: InputType
  value: string
  onSave: () => void
  validation?: () => void
  onValidationFail?: () => void
  onCancel?: () => void
  inputProps?: InputProps
  viewProps?: ViewProps
  hint?: React.ReactNode
  validationMessage?: string
  saveButtonClassName?: string
  editButtonClassName?: string
  cancelButtonClassName?: string
  cancelButtonText?: string
  saveButtonText?: string
  editButtonText?: string
}

interface State {
  /** True when user hovers her pointer */
  hovering: boolean
  editing: boolean
  value: string
  savedValue: string
}

export default class EditableText extends React.Component<Props, State> {
  editButton: React.RefObject<{}>
  saveButton: React.RefObject<{}>
  cancelButton: React.RefObject<{}>
  input: React.RefObject<{}>
  static defaultProps = {
    value: 'nice long description',
    type: 'text',
    onCancel: () => {},
    cancelButtonText: '',
    saveButtonText: '',
    editButtonText: ''
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      hovering: false,
      editing: false,
      value: props.value || '',
      savedValue: ''
    }
    this.editButton = React.createRef()
    this.saveButton = React.createRef()
    this.cancelButton = React.createRef()
    this.input = React.createRef()
  }

  onInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  onMouseEnter = () => {
    this.setState({ hovering: true })
  }

  onMouseLeave = () => {
    this.setState({ hovering: false })
  }
  onCancel = () => {
    this.setState(
      {
        editing: false,
        value: this.state.savedValue || this.props.value
      },
      () => this.props.onCancel(this.state.value)
    )
  }

  activateEditMode = () => {
    this.setState({
      editing: true
    })
  }

  onSave = () => {
    const { onSave } = this.props

    this.setState(
      {
        editing: false,
        savedValue: this.state.value
      },
      () => onSave(this.state.savedValue)
    )
  }

  renderInput() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          ref={this.input}
          className={styles.EditableText__input}
          {...this.props.inputProps}
          value={this.state.value}
          onChange={this.onInputChange}
          autoFocus={this.state.editing}
        />
      )
    } else {
      return (
        <input
          ref={this.input}
          className={styles.EditableText__input}
          {...this.props.inputProps}
          value={this.state.value}
          type={this.props.type}
          onChange={this.onInputChange}
          autoFocus={this.state.editing}
        />
      )
    }
  }
  renderEditingMode = () => {
    const {
      saveButtonClassName,
      saveButtonText,
      cancelButtonClassName,
      cancelButtonText,
      hint
    } = this.props

    const inputElem = this.renderInput()

    const saveButtonDefaultClasses = classnames(
      `${styles.EditableText__button}`,
      `${styles.EditableText__save_button}`
    )
    const saveButtonClass = saveButtonClassName || saveButtonDefaultClasses
    const cancelButtonDefaultClasses = classnames(
      `${styles.EditableText__button}`,
      `${styles.EditableText__cancel_button}`
    )
    const cancelButtonClass =
      cancelButtonClassName || cancelButtonDefaultClasses
    return (
      <div>
        <div className={styles.EditableText__editing_container}>
          {inputElem}
          <div className={styles.EditableText__buttons_container}>
            <button
              ref={this.saveButton}
              type="button"
              className={saveButtonClass}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onClick={this.onSave}
            >
              {saveButtonText}
            </button>
            <button
              ref={this.cancelButton}
              type="button"
              className={cancelButtonClass}
              onClick={this.onCancel}
            >
              {cancelButtonText}
            </button>
          </div>
        </div>

        {hint && <div className={styles.EditableText__hint}>{hint}</div>}
      </div>
    )
  }
  renderViewMode = () => {
    const { viewProps, editButtonClassName, editButtonText } = this.props
    // calculate edit button classes
    const editButtonDefaultClasses = classnames(
      `${styles.EditableText__button}`,
      `${styles.EditableText__edit_button}`
    )
    const editButtonClass = editButtonClassName || editButtonDefaultClasses
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={styles.EditableText__view_container}
      >
        <div {...viewProps}>{this.state.value}</div>
        {this.state.hovering ? (
          <div className={styles.EditableText__buttons_container}>
            <button
              ref={this.editButton}
              type="button"
              className={editButtonClass}
              onClick={this.activateEditMode}
            >
              {editButtonText}
            </button>
          </div>
        ) : null}
      </div>
    )
  }
  render() {
    const mode = this.state.editing
      ? this.renderEditingMode()
      : this.renderViewMode()
    return <div className={styles.EditableText__main_container}>{mode}</div>
  }
}

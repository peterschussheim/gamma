/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  )
}

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <div className="input-group">
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  )
}

const Input = styled('input')({
  background: 'white',
  height: 30,
  border: 'none',
  borderRadius: 0,
  boxShadow: 'var(--shadow)',
  borderBottom: 5,
  width: '100%',
  minWidth: 150,
  display: 'block',
  paddingLeft: 10,
  '::placeholder': {
    opacity: 0.5,
    textOverflow: 'ellipsis'
  }
})

const TextArea = styled('textarea')({
  background: 'white',
  border: 'none',
  height: 200,
  borderRadius: 0,
  boxShadow: 'var(--shadow)',
  borderBottom: 5,
  width: '100%',
  minWidth: 150,
  display: 'block',
  margin: '0 auto 10px auto',
  paddingTop: 10,
  paddingLeft: 10,
  '::placeholder': {
    opacity: 0.5
  }
})

const GistInputsContainer = styled('div')({
  display: 'flex',
  '@media only screen and (max-width: 819px)': {
    order: 1,
    marginTop: 10,
    flex: 1
  }
})

export { GistInputsContainer, TextInput, Input, TextArea }

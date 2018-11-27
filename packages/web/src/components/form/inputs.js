/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'

// const inputFeedback = css`
//   color: #999;
//   margin-top: 0.25rem;
// `
// const inputFeedbackErr = css`
//   color: red;
// `
// const red = css`
//   color: red;
// `
// const textInput = css`
//   padding: 0.5rem;
//   font-size: 16px;
//   width: 100%;
//   display: block;
//   border-radius: 0px;
//   border: 1px solid #ccc;
// `

// const textInputFocus = css`
//   border-color: #007eff;
//   box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
//     0 0 0 3px rgba(0, 126, 255, 0.1);
//   outline: none;
// `
// const textInputErr = css`
//   border-color: red;
// `
// const label = css`
//   font-weight: bold;
//   display: block;
//   margin-bottom: 0.5rem;
// `

// // .label {
// //   font-weight: bold;
// //   display: block;
// //   margin-bottom: .5rem;
// // }

// // .error .label {
// //   color: red;
// // }

// const inputGroup = css`
//   margin-bottom: 1rem;
// `

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
  // const classes = cx(
  //   'input-group',
  //   {
  //     'animated shake error': !!error
  //   },
  //   className
  // )
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
    opacity: 0.5
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

const Button = styled('button')({
  fontSize: 13,
  background: 'var(--green)',
  padding: '10px 20px',
  display: 'block',
  marginLeft: 'auto',
  color: 'white',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'var(--shadow)',
  cursor: 'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

export { TextInput, Input, TextArea, Button }

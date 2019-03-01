/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
}
export const UserBtnsContainer = styled('div')({
  display: 'flex',
  '@media only screen and (max-width: 819px)': {
    order: 1,
    marginTop: 10,
    flex: 1
  }
})

export const BlueButton = styled('button')({
  // @ts-ignore
  maxWidth: '150px',
  margin: '20px 5px',
  padding: '6px 12px',
  backgroundImage: 'linear-gradient(-180deg,#fafbfc,#eff3f6 90%)',
  borderColor: 'rgba(27,31,35,.2)',
  borderStyle: 'solid',
  borderRadius: '0px',
  backgroundColor: '#08c',
  fontSize: '12px',
  fontWeight: '500',
  background: '#037acb80',
  cursor: 'pointer',
  color: 'var(--black)',
  outline: 'none',
  ':hover': {
    backgroundColor: 'var(--blue)',
    backgroundPosition: '-.5em',
    backgroundImage: 'linear-gradient(-180deg,var(--blue),var(--blue) 90%)',
    borderColor: 'rgba(27,31,35,.35)',
    textDecoration: 'none',
    backgroundRepeat: 'repeat-x'
  },
  ':active': {
    boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,.15)'
  }
})

export const GreenButton = styled('button')({
  // @ts-ignore
  maxWidth: '150px',
  margin: '20px 5px',
  padding: '6px 12px',
  backgroundImage: 'linear-gradient(-180deg,#fafbfc,#eff3f6 90%)',
  borderColor: 'rgba(27,31,35,.2)',
  borderStyle: 'solid',
  borderRadius: '0px',
  backgroundColor: '#08c',
  fontSize: '12px',
  fontWeight: '500',
  background: '#5edb939e',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    backgroundColor: '#5edb93',
    backgroundPosition: '-.5em',
    backgroundImage: 'linear-gradient(-180deg,#5edb93,#5edb93 90%)',
    borderColor: 'rgba(27,31,35,.35)',
    textDecoration: 'none',
    backgroundRepeat: 'repeat-x'
  },
  ':active': {
    boxShadow: 'inset 0 0.15em 0.3em rgba(0, 0, 0, 0.15)'
  }
})

export const RedButton: React.FunctionComponent<ButtonProps> = props => (
  <button
    css={{
      maxWidth: '150px',
      margin: '20px 5px',
      padding: '6px 12px',
      backgroundImage: 'linear-gradient(-180deg,var(--red),var(--red) 90%)',
      borderColor: 'rgba(27,31,35,.2)',
      borderStyle: 'solid',
      borderRadius: '0px',
      backgroundColor: 'var(--red)',
      fontSize: '12px',
      fontWeight: '500',
      background: '#d73a49ab',
      cursor: 'pointer',
      color: 'var(--black)',
      outline: 'none',
      ':hover': {
        backgroundColor: 'var(--red)',
        backgroundPosition: '-.5em',
        backgroundImage: 'linear-gradient(-180deg,var(--red),var(--red) 90%)',
        borderColor: 'rgba(27,31,35,.35)',
        textDecoration: 'none',
        backgroundRepeat: 'repeat-x'
      },
      ':active': {
        boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,.15)'
      }
    }}
  >
    {props.text}
  </button>
)

export const DefaultButton = styled('button')({
  // @ts-ignore
  maxWidth: '150px',
  margin: '20px 5px',
  padding: '6px 12px',
  backgroundImage: 'linear-gradient(-180deg,#fafbfc,#eff3f6 90%)',
  borderColor: 'rgba(27,31,35,.2)',
  borderStyle: 'solid',
  borderRadius: '0px',
  backgroundColor: '#08c',
  fontSize: '12px',
  fontWeight: '500',
  background: 'var(--grey)',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    backgroundColor: '#e6ebf1',
    backgroundPosition: '-.5em',
    backgroundImage: 'linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%)',
    borderColor: 'rgba(27,31,35,.35)',
    textDecoration: 'none',
    backgroundRepeat: 'repeat-x'
  },
  ':active': {
    boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,.15)'
  }
})

export const SocialButton = styled('a')({
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none'
})

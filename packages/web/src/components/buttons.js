import styled from '@emotion/styled'

export const UserBtnsContainer = styled('div')({
  width: '25%',
  display: 'flex',
  justifyContent: 'center',
  '@media only screen and (max-width: 819px)': {
    order: 1,
    marginTop: 10,
    flex: 1
  }
})

export const BlueButton = styled('button')({
  maxWidth: '150px',
  margin: '20px 0',
  padding: '12px 20px',
  borderStyle: 'none',
  borderRadius: '0px',
  backgroundColor: '#08c',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
  fontSize: '12px',
  fontWeight: '500',
  color: '#fff',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

export const GreenButton = styled('button')({
  maxWidth: '150px',
  margin: '20px 5px 5px 5px',
  padding: '12px 20px',
  borderStyle: 'none',
  borderRadius: '0px',
  backgroundColor: '#08c',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
  fontSize: '12px',
  fontWeight: '500',
  background: 'var(--green)',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

export const RedButton = styled('button')({
  maxWidth: '150px',
  margin: '20px 0px',
  padding: '12px 20px',
  borderStyle: 'none',
  borderRadius: '0px',
  backgroundColor: '#08c',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
  fontSize: '12px',
  fontWeight: '500',
  background: 'var(--red)',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

export const DefaultButton = styled('button')({
  maxWidth: '150px',
  margin: '20px 0px',
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

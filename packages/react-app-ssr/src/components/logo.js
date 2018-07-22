import styled from 'react-emotion'

export const SocialLogo = styled('img')({
  width: 55,
  background: 'white',
  boxShadow: 'var(--shadow)',
  borderRadius: 0,
  padding: 15,
  marginRight: 15,
  cursor: 'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

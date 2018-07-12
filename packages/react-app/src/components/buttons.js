import React from 'react'
import styled from 'react-emotion'

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

export const UserBtn = styled('span')({
  background: 'white',
  boxShadow: 'var(--shadow)',
  borderRadius: 15,
  padding: 15,
  marginLeft: 15,
  cursor: 'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

export const NewPostBtn = styled('span')({
  background: 'var(--green)',
  boxShadow: 'var(--shadow)',
  color: 'white',
  fontSize: 40,
  borderRadius: 15,
  padding: 15,
  lineHeight: 0.5,
  transition: '0.5s',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 10,
  right: 10,
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

export const SocialButton = styled('a')({
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none'
})

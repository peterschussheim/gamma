import React from 'react'
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
  outline: 'none'
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

export const SocialButton = styled('a')({
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none'
})

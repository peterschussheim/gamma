import React from 'react'
import styled from 'react-emotion'

import { SocialLogo } from './components/logo'
import { NewPostBtn, SocialButton, UserBtnsContainer, UserBtn } from './buttons'
import githubLogo from './assets/github.svg'

export const SocialMedia = () => (
  <UserBtnsContainer>
    <SocialButton href="https://github.com/peterschussheim">
      <SocialLogo src={githubLogo} />
    </SocialButton>
  </UserBtnsContainer>
)

const Header = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px 0px'
})

const TitleContainer = styled('div')({
  display: 'flex',
  '@media only screen and (max-width: 819px)': {
    order: 0,
    width: '100%'
  },
  '& > div': {
    borderRadius: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'white',
    textAlign: 'center',
    padding: '30px 50px',
    boxShadow: 'var(--shadow)'
  }
})

const Title = styled('h1')({
  color: 'var(--green)',
  fontSize: 50,
  lineHeight: '40px',
  textTransform: 'upperase'
})

const SecondaryTitle = styled('span')({
  color: 'var(--black)'
})

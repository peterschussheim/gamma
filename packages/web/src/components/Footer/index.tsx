import * as React from 'react'

import { FooterContainer, CurrentFile, IconContainer } from './elements'

const Footer = ({ currentFile, iconComponent }) => {
  return (
    <FooterContainer>
      <CurrentFile>{currentFile}</CurrentFile>
      <IconContainer>{iconComponent}</IconContainer>
    </FooterContainer>
  )
}

export default Footer

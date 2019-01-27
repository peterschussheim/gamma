import * as React from 'react'

import { FooterContainer, FooterItem, IconContainer } from './elements'

const Footer: React.FunctionComponent<{
  status?: string
  currentFile: string
  iconComponent: React.ReactNode
}> = ({ status, currentFile, iconComponent }) => {
  return (
    <FooterContainer>
      <FooterItem>{currentFile}</FooterItem>
      {status ? <FooterItem>{status}</FooterItem> : null}
      <IconContainer>{iconComponent}</IconContainer>
    </FooterContainer>
  )
}

export default Footer

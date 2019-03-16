import * as React from 'react'

import {
  FooterContainer,
  FooterItem,
  IconContainer,
  FooterStatus
} from './elements'

const Footer: React.FunctionComponent<{
  isPublic?: React.ReactNode
  status?: string
  currentFile?: string
  iconComponent?: React.ReactNode
}> = ({ isPublic, status, currentFile, iconComponent }) => {
  return (
    <FooterContainer>
      <FooterItem>{currentFile}</FooterItem>
      {isPublic ? <FooterItem>{isPublic}</FooterItem> : null}
      {status ? <FooterStatus>{status}</FooterStatus> : null}
      <IconContainer>{iconComponent}</IconContainer>
    </FooterContainer>
  )
}

export default Footer

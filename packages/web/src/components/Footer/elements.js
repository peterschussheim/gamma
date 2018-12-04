import styled from '@emotion/styled'

const FooterContainer = styled.div`
  background-color: #007acc;
  color: white;
  font-weight: 100;
  max-width: 800px;
  min-height: 17px;
  max-height: 17px;
  display: flex;
`

const CurrentFile = styled.div`
  font-size: 10px;
  padding-top: 1px;
  padding-left: 10px;
  text-align: left;
`

const IconContainer = styled.div`
  flex: 1;
  text-align: right;
  padding-right: 10px;
`

export { FooterContainer, CurrentFile, IconContainer }

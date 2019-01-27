import styled from '@emotion/styled'

const FooterContainer = styled.div`
  background-color: #007acc;
  color: white;
  font-weight: 100;
  max-width: 800px;
  min-height: 17px;
  max-height: 17px;
  padding-left: 10px;
  display: flex;
`

const FooterItem = styled.div`
  font-size: 10px;
  padding-top: 1px;
  text-align: left;
  padding-left: 3px;
  padding-right: 3px;
  &:hover {
    cursor: pointer;
    background-color: #2024314f;
  }
`

const IconContainer = styled.div`
  flex: 1;
  text-align: right;
  padding-right: 10px;
`

export { FooterContainer, FooterItem, IconContainer }

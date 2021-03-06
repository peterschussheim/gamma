/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`

const FooterContainer = styled.div`
  background-color: #007acc;
  color: white;
  font-weight: 100;
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

const FooterStatus = styled.div`
  font-size: 10px;
  padding-top: 1px;
  text-align: left;
  padding-left: 3px;
  padding-right: 3px;
  &:hover {
    cursor: pointer;
    background-color: #2024314f;
  }
  visibility: ${props => (props.out ? 'hidden' : 'visible')};
  animation: ${props => (props.out ? fadeOut : '')} 3s linear;
  transition: visibility 3s linear;
`

const IconContainer = styled.div`
  flex: 1;
  text-align: right;
  padding-right: 10px;
`

export { FooterContainer, FooterItem, IconContainer, FooterStatus }

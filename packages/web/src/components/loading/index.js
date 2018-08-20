import React from 'react'
import styled from 'react-emotion'

import Spinner from './styles'

const LoadingContainer = styled('div')({
  display: 'flex',
  flex: 'auto',
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

export const Loading = ({ size, color }) => (
  <LoadingContainer>
    <Spinner size={size} color={color} />
  </LoadingContainer>
)

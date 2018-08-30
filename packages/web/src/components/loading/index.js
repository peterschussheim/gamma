import React from 'react'
import styled from 'react-emotion'

// import { Spinner } from './styles'

const LoadingContainer = styled('div')({
  display: 'flex',
  flex: 'auto',
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

export const Loading = props => {
  if (props.error) {
    return <LoadingContainer>Error!</LoadingContainer>
  }

  if (props.timedOut) {
    return <LoadingContainer>Taking a long time...</LoadingContainer>
  }

  if (props.pastDelay) {
    return <LoadingContainer>Loading...</LoadingContainer>
  }

  return null
}

// export const Loading = ({ size, color }) => (
//   <LoadingContainer>
//     Loading...
//     {/* <Spinner size={size} color={color} /> */}
//   </LoadingContainer>
// )

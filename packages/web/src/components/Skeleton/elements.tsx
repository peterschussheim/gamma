import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  max-height: 500px;
  max-width: 800px;
`
const LeftPanel = styled.div`
  flex: 1;
  overflow: auto;
  background-color: #001023;
`
const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`

export { Container, LeftPanel, RightPanel }

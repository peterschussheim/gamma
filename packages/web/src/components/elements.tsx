/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

const Fullscreen = styled.div`
  display: flex;
  flex: auto;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 0;
`
const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 0;
`

const Content = styled.div`
  flex: auto;
  display: flex;
`

export { Fullscreen, Container, Row, Content }

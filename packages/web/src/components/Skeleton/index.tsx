import * as React from 'react'

import { Container, LeftPanel, RightPanel } from './elements'

type Props = {
  sidebar: React.ReactNode
  editor: React.ReactNode
}

export default class Skeleton extends React.Component<Props> {
  // shouldComponentUpdate() {
  //   return false
  // }

  render() {
    const { sidebar, editor } = this.props

    return (
      <Container>
        <LeftPanel>{sidebar}</LeftPanel>
        <RightPanel>{editor}</RightPanel>
      </Container>
    )
  }
}

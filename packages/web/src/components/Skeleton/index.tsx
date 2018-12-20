import * as React from 'react'
import PropTypes from 'prop-types'

import { Container, LeftPanel, RightPanel } from './elements'

export default class Skeleton extends React.Component {
  static propTypes = {
    sidebar: PropTypes.node,
    editor: PropTypes.node
  }

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

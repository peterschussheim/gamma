import * as React from 'react'
import PropTypes from 'prop-types'

import { Container, LeftPanel, RightPanel } from './elements'

export default class Skeleton extends React.Component {
  static propTypes = {
    sidebar: PropTypes.node,
    editor: PropTypes.node
  }
  state = { data: null, selectedFile: 0 }

  componentDidMount() {
    this.setState((state, props) => ({
      data: props.data
    }))
  }

  render() {
    const { data, sidebar, editor } = this.props

    return (
      <Container>
        <LeftPanel>{sidebar}</LeftPanel>
        <RightPanel>{editor}</RightPanel>
      </Container>
    )
  }
}

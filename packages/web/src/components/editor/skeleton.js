import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  container: {
    display: 'flex',
    minHeight: 600
  },
  rightPanel: {
    flex: 1
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3
  }
}

export default class Skeleton extends Component {
  static propTypes = {
    panel: PropTypes.node,
    children: PropTypes.node
  }

  render() {
    const { panel, children } = this.props

    return (
      <div style={styles.container}>
        <div style={styles.rightPanel}>{panel}</div>
        <div style={styles.leftPanel}>{children}</div>
      </div>
    )
  }
}

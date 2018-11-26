import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
  container: {
    display: 'flex',
    maxHeight: 500,
    maxWidth: 800
  },
  rightPanel: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#343436'
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3
  }
}

export default class Skeleton extends Component {
  static propTypes = {
    sidebar: PropTypes.node,
    children: PropTypes.node
  }

  render() {
    const { sidebar, children } = this.props

    return (
      <div style={styles.container}>
        <div style={styles.rightPanel}>{sidebar}</div>
        <div style={styles.leftPanel}>{children}</div>
      </div>
    )
  }
}

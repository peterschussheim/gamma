import React from 'react'

const styles = {
  container: {
    backgroundColor: '#007ACC',
    color: 'white',
    fontWeight: 100,
    fontSize: 10,
    width: 800
  }
}

const Header = ({ title }) => <div style={styles.container}>{title}</div>

export default Header

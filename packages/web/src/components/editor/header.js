import React from 'react'

const styles = {
  container: {
    backgroundColor: '#007ACC',
    color: 'white',
    fontWeight: 100,
    fontSize: 10,
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
  }
}

const Header = ({ title }) => <div style={styles.container}>{title}</div>

export default Header

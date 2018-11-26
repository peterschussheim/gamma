import React from 'react'

const styles = {
  container: {
    backgroundColor: '#007ACC',
    color: 'white',
    fontWeight: 100,
    maxWidth: 800,
    minHeight: 17,
    maxHeight: 17,
    display: 'flex'
  },
  currentFile: {
    fontSize: 10,
    paddingTop: 1,
    paddingLeft: 10,
    textAlign: 'left'
  },
  icon: {
    flex: '1',
    textAlign: 'right',
    paddingRight: 10
  }
}

const Footer = ({ currentFile, iconComponent }) => {
  return (
    <div style={styles.container}>
      <div style={styles.currentFile}>{currentFile}</div>
      <div style={styles.icon}>{iconComponent}</div>
    </div>
  )
}

export default Footer

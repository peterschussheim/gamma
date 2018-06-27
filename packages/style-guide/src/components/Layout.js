import React from 'react'

export default ({ children }) => {
  return (
    <div className="grid-layout">
      <div className="header">Header</div>
      <div className="sidebar">Sidebar</div>
      <div className="content">
        {children}
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </div>
      <div className="footer">Footer</div>
    </div>
  )
}

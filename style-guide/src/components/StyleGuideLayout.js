import React from 'react'

export default ({ label, component }) => {
  return (
    <div className="style-guide-layout hairline-border">
      <div className="label">
        {label}
        <div className="component hairline-border">{component}</div>
      </div>
    </div>
  )
}

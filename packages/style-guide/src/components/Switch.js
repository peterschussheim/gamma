import React from 'react'

export default class Switch extends React.Component {
  render() {
    const { className = '', ...props } = this.props
    const on = this.props['aria-pressed']
    const btnClassName = [
      className,
      'toggle-btn',
      on ? 'toggle-btn-on' : 'toggle-btn-off'
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <div>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={() => {
            // changing is handled by clicking the button
          }}
        />
        <button className={btnClassName} aria-label="Toggle" {...props} />
      </div>
    )
  }
}

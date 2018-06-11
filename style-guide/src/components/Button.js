import React from 'react'

export default function Button({
  className = 'button',
  handleClick = null,
  handleReset = null,
  text,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={className}
      onClick={handleClick ? handleClick : handleReset}
      type="button"
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  )
}

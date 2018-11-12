import React from 'react'
import { Link } from 'react-router-dom'

const ConnectToGithub = ({ onClickHandler, href }) => {
  return (
    <a
      data-cy="connect-github-link"
      onClick={() => onClickHandler && onClickHandler('github')}
      href={href}
    >
      <button>Connect to GitHub</button>
    </a>
  )
}

export default ConnectToGithub

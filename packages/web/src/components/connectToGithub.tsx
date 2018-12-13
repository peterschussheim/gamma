import * as React from 'react'

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

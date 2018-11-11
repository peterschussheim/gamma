import React from 'react'
import { withRouter } from 'react-router'

const ConnectToGithub = props => {
  const { history } = props
  const location = {
    pathname: '/auth/github'
  }

  return (
    <button
      data-cy="connect-github-link"
      onClick={() => history.push(location)}
    >
      Connect to GitHub
    </button>
  )
}

export default withRouter(ConnectToGithub)

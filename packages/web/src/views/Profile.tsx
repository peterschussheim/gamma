import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import Logout from '../components/Logout'
import ConnectToGithub from '../components/connectToGithub'
import { VIEWER_ME } from '../queries'

class Profile extends React.Component {
  renderAuthLink = props => {
    if (
      props.location.pathname === '/auth/login' ||
      props.location.pathname === '/auth/signup'
    ) {
      return null
    } else {
      return (
        <Link data-cy="authenticate-link" to="/auth/login">
          Authenticate with PW
        </Link>
      )
    }
  }
  render() {
    return (
      <Query query={VIEWER_ME} ssr={false}>
        {({ client, loading, error, data }) => {
          if (loading) {
            return null
          }
          if (error) {
            return <div>{error}</div>
          }
          if (data.viewer.me == null) {
            return this.renderAuthLink(this.props)
          } else {
            return (
              <React.Fragment>
                <h3>{data.viewer.me.email}</h3>
                {data.viewer.me.githubProfile ? null : (
                  <ConnectToGithub
                    onClickHandler={() =>
                      console.log('connecting to GitHub...')
                    }
                    href={`https://api.gamma.app/auth/github`}
                  />
                )}
                <Logout client={client} props={this.props} />
              </React.Fragment>
            )
          }
        }}
      </Query>
    )
  }
}

// @ts-ignore
export default withRouter(Profile)

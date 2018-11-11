import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import Logout from '../components/logout'
import ConnectToGithub from '../components/connectToGithub'
import { VIEWER } from '../queries'

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
      <Query query={VIEWER} ssr={false}>
        {({ client, loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (error) {
            return <div>{error}</div>
          }
          if (data.viewer.me == null) {
            return this.renderAuthLink(this.props)
          } else {
            return (
              <React.Fragment>
                <div>{data.viewer.me.id}</div>
                <div>{data.viewer.me.email}</div>
                {data.viewer.me.githubProfile ? null : (
                  <ConnectToGithub props={this.props} />
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

export default withRouter(Profile)

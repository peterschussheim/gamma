import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import Logout from '../components/logout'
import { VIEWER } from '../queries'

class Profile extends React.Component {
  render() {
    return (
      <Query query={VIEWER} ssr={false}>
        {({ client, loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (data) {
            if (data.viewer.me === null) {
              // TODO: if user is on '/auth/login', do NOT show auth button
              return (
                <p data-cy="authenticate-link">
                  <Link to="/auth/login">Authenticate with PW</Link>
                </p>
              )
            } else {
              return (
                <React.Fragment>
                  <div>{data.viewer.me.id}</div>
                  <div>{data.viewer.me.email}</div>
                  {data.viewer.me.githubProfile ? null : (
                    <button
                      type="button"
                      onClick={this.handleAuthorizeWithGithub}
                    >
                      Connect to Github Via server
                    </button>
                  )}
                  <Logout client={client} />
                </React.Fragment>
              )
            }
          }
        }}
      </Query>
    )
  }
}

export default withRouter(Profile)

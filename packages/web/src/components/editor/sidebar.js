import React from 'react'
import { Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { VIEWER_GISTS } from '../../queries'

const styles = {
  sidebar: {
    backgroundColor: '#343436',
    overflow: 'auto'
  },
  sidebarItem: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '5px 10px'
  }
}

const SidebarItem = props => {
  return <div {...props} />
}

const GistList = props => {
  return (
    <Query query={VIEWER_GISTS} ssr={false}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>
        }
        if (error) {
          return <div>{error}</div>
        } else {
          return (
            <div style={styles.sidebar}>
              {data.viewer.gists
                ? data.viewer.gists.map(gist => (
                    <SidebarItem style={styles.sidebarItem} key={gist.gistId}>
                      <Link to={`/g/${gist.gistId}`}>
                        {gist.description || '[no description]'}
                      </Link>
                    </SidebarItem>
                  ))
                : null}
            </div>
          )
        }
      }}
    </Query>
  )
}

export default class Sidebar extends React.Component {
  render() {
    return <GistList props={this.props} />
  }
}

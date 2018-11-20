import React from 'react'
import { Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { VIEWER_GISTS } from '../../queries'

const styles = {
  sidebar: {
    backgroundColor: '#343436',
    width: '33vw',
    height: '100vh',
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
  return <div style={styles.sidebarItem} {...props} />
}

const GistList = props => {
  return (
    <Query query={VIEWER_GISTS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>
        }
        if (error) {
          return <div>{error}</div>
        } else {
          return (
            <React.Fragment>
              {data.viewer.gists
                ? data.viewer.gists.map(gist => (
                    <SidebarItem key={gist.gistId}>
                      <Link to={`/g/${gist.gistId}`}>
                        {gist.description || '[no description]'}
                      </Link>
                    </SidebarItem>
                  ))
                : null}
            </React.Fragment>
          )
        }
      }}
    </Query>
  )
}

export default class Sidebar extends React.Component {
  render() {
    return (
      <div style={styles.sidebar}>
        <GistList />
      </div>
    )
  }
}

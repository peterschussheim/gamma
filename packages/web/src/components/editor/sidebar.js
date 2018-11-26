import React from 'react'
import { compose, graphql, Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { VIEWER_GISTS } from '../../queries'
import Gist from '../../views/gist'

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

class GistList extends React.PureComponent {
  render() {
    const { data, loading, error } = this.props
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      return <div>{error}</div>
    } else {
      return (
        <div style={styles.sidebar}>
          {data.viewer
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
  }
}

const ConnectedGistList = graphql(VIEWER_GISTS, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => props.onCompleted
  })
})(GistList)

class Sidebar extends React.Component {
  state = { gists: null }

  handleOnCompleted = gists => this.setState(() => ({ gists }))
  render() {
    return (
      <ConnectedGistList
        onCompleted={this.handleOnCompleted}
        props={this.props}
      />
    )
  }
}

export default Sidebar

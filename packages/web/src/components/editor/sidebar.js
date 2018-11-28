import React from 'react'
import { compose, graphql, Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'

import { VIEWER_GISTS } from '../../queries'
import Icon from '../icon'

const styles = {
  description: {
    fontSize: 11,
    margin: '0px 15px 5px 5px',
    color: 'white',
    outline: '1px dotted #e73'
  },
  sidebar: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  sidebarItem: {
    color: 'white',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '0px 20px',
    fontSize: 9
  }
}

const SidebarItem = props => {
  return <div {...props} />
}

export class FileList extends React.Component {
  render() {
    return (
      <div style={styles.sidebar}>
        <span style={styles.description}>
          {gist.description || '[no description]'}
        </span>
        {gist.files.map((file, index) => (
          <SidebarItem
            style={styles.sidebarItem}
            key={file.filename}
            onClick={handleLoadSelectedFile}
          >
            <Icon height={12} name={file.filename} /> {file.filename}
          </SidebarItem>
        ))}
      </div>
    )
  }
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
  state = { gists: null, currentGist: null, selectedFile: null }

  handleRenderSelectedFile = e => {
    e.preventDefault()
    console.log(e)
    const { selectedFile } = e.target.value
    this.setState({ selectedFile })
  }

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

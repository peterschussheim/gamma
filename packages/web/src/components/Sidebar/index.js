import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import { VIEWER_GISTS } from '../../queries'

import {
  SidebarContainer,
  FileListContainer,
  Description,
  SidebarItem
} from './elements'

class GistList extends React.PureComponent {
  render() {
    const { data, loading, error } = this.props
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      return <div>{error}</div>
    } else {
      return (
        <SidebarContainer>
          {data.viewer
            ? data.viewer.gists.map(gist => (
                <SidebarItem key={gist.gistId}>
                  <Link to={`/g/${gist.gistId}`}>
                    {gist.description || '[no description]'}
                  </Link>
                </SidebarItem>
              ))
            : null}
        </SidebarContainer>
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

import * as React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { VIEWER_GISTS } from '../../queries'
import { SidebarContainer, SidebarItem } from '../Sidebar/elements'

class GistList extends React.PureComponent {
  render() {
    const { data } = this.props
    const { loading, error } = data
    if (loading) {
      return null
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

export default graphql(VIEWER_GISTS, {
  options: props => ({
    fetchPolicy: 'cache-and-network'
  })
})(GistList)

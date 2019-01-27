import * as React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { ViewerGists } from '../../__generated__/types'
import { VIEWER_GISTS } from '../../queries'
import { SidebarContainer, SidebarItem } from '../Sidebar/elements'

interface Props {
  data: ViewerGists
}

const withGistList = graphql(VIEWER_GISTS, {
  options: () => ({
    fetchPolicy: 'cache-and-network'
  })
})

class GistList extends React.PureComponent<Props> {
  render() {
    const { data } = this.props
    // @ts-ignore
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

// @ts-ignore
export default withGistList(GistList)

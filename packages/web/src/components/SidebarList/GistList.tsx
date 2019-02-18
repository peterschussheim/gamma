import * as React from 'react'
import { Link } from 'react-router-dom'

import { ViewerGists } from '../../__generated__/types'
import { SidebarContainer, SidebarItem } from '../Sidebar/elements'

interface Props {
  data: ViewerGists
}

const GistList: React.FC<Props> = ({ data }) => {
  // @ts-ignore
  if (data && data.loading) {
    return <div>loading</div>
  }

  // @ts-ignore
  if (data && data.error) {
    // @ts-ignore
    return <div>{data.error.message}</div>
  }
  return (
    <SidebarContainer>
      {data && data.viewer
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

// @ts-ignore
export default GistList

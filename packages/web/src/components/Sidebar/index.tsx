import * as React from 'react'
import GistList from '../SidebarList/GistList'

type Props = {
  /** called when selecting a gist|file from a list of gist|files */
  onSelectEntry: () => void
}

class Sidebar extends React.Component<Props> {
  render() {
    return <GistList {...this.props} />
  }
}

export default Sidebar

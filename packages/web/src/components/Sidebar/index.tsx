import * as React from 'react'
import GistList from '../SidebarList/GistList'

class Sidebar extends React.Component {
  render() {
    return <GistList onCompleted={this.handleOnCompleted} props={this.props} />
  }
}

export default Sidebar

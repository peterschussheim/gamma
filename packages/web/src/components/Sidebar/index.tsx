import * as React from 'react'
import GistList from '../SidebarList/GistList'

class Sidebar extends React.Component {
  state = { gists: null, currentGist: null, selectedFile: null }

  handleRenderSelectedFile = e => {
    e.preventDefault()
    // tslint:disable-next-line:no-console
    console.log(e)
    const { selectedFile } = e.target.value
    this.setState({ selectedFile })
  }
  componentDidMount() {
    this.handleOnCompleted(this.props.onCompleted)
  }

  handleOnCompleted = gists => this.setState(() => ({ gists }))
  render() {
    return <GistList onCompleted={this.handleOnCompleted} props={this.props} />
  }
}

export default Sidebar

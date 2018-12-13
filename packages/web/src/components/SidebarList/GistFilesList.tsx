import * as React from 'react'
import { graphql } from 'react-apollo'

import { GET_GIST_BY_ID } from '../../queries'
import { FileListContainer, SidebarContainer } from './elements'
import { Description, ListItem } from '../ListItems/elements'
import Icon from '../icon'

class GistFilesList extends React.Component {
  render() {
    const { data, activeFile, handleClickFile } = this.props
    const { loading, error } = data
    if (loading || !data) {
      return null
    } else if (error) {
      return `Error!: ${error}`
    } else
      return (
        <FileListContainer>
          <SidebarContainer>
            <Description>
              {data.getGistById.description || '[no description]'}
            </Description>
            {data.getGistById.files.map((file, index) => (
              <ListItem onClick={handleClickFile} key={file.filename}>
                <Icon
                  onClick={handleClickFile}
                  height={12}
                  name={file.filename}
                />{' '}
                {file.filename}
              </ListItem>
            ))}
          </SidebarContainer>
        </FileListContainer>
      )
  }
}

export default graphql(GET_GIST_BY_ID, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      gistId: props.gistId
    }
  })
})(GistFilesList)

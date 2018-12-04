import React from 'react'

import { FileListContainer, SidebarContainer } from './elements'
import { Description, ListItem } from '../ListItems/elements'
import Icon from '../icon'

export default class OldFileList extends React.Component {
  render() {
    const { gist } = this.props
    return (
      <FileListContainer>
        <SidebarContainer>
          <Description>{gist.description || '[no description]'}</Description>
          {gist.files.map((file, index) => (
            <ListItem key={file.filename}>
              <Icon onClick height={12} name={file.filename} /> {file.filename}
            </ListItem>
          ))}
        </SidebarContainer>
      </FileListContainer>
    )
  }
}

import * as React from 'react'

import { Files, File, FileList, FilePanels, FilePanel } from './files'
import { Description } from '../ListItems/elements'

export class FilesExample extends React.Component {
  state = {
    currentFile: 0
  }
  render() {
    const { currentFile } = this.state
    const { files } = this.props.gist
    const fileToRender = files[currentFile]

    return (
      <React.Fragment>
        <Files
          activeIndex={this.state.currentFile}
          onChange={index => {
            this.setState({ currentFile: index })
          }}
        >
          <Description>{this.props.gist.description || ''}</Description>
          <FileList>
            {files.map((file, index) => (
              <File key={file.filename}>{file.filename}</File>
            ))}
          </FileList>
          <FilePanels>
            <FilePanel>{fileToRender.content}</FilePanel>
          </FilePanels>
        </Files>
      </React.Fragment>
    )
  }
}

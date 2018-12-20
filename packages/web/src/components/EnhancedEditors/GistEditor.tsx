import * as React from 'react'

import Skeleton from '../Skeleton'
import Footer from '../Footer'
import GistFilesList from '../SidebarList/GistFilesList'
import Icon from '../icon'
import MonacoEditor from '../MonacoEditor/MonacoEditor'
import { EditorContext } from './EditorContext'
import { Debugger } from '../Debugger'
export interface GetGistById {
  gistId: string
  description: string
  files?: FilesEntity[] | null
  isPublic: boolean
  __typename: string
}
export interface FilesEntity {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  truncated: boolean
  content: string
  __typename: string
}

interface GistEditorProps {
  getGistById: GetGistById
  gistId: string
}

export default class GistEditor extends React.Component<GistEditorProps, {}> {
  static contextType = EditorContext

  render() {
    const { getGistById, gistId } = this.props
    const {
      currentFile,
      currentValue,
      onSelectFile,
      onOpenPath,
      onValueChange
    } = this.context

    return (
      <React.Fragment>
        <Skeleton
          data={getGistById}
          sidebar={
            <GistFilesList
              handleClickFile={onSelectFile}
              gistId={gistId}
              {...this.props}
            />
          }
          editor={
            <MonacoEditor
              onValueChange={onValueChange}
              onOpenPath={() => onOpenPath(currentFile)}
              value={currentValue}
            />
          }
        />
        <Footer
          currentFile={currentFile}
          iconComponent={<Icon height={17} filename={currentFile} />}
        />
        <Debugger
          componentName="GistEditor"
          context={this.context}
          props={this.props}
        />
      </React.Fragment>
    )
  }
}

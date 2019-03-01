import * as React from 'react'
import styled from '@emotion/styled'

import {
  MdClear as CrossIcon,
  MdInsertDriveFile as AddFileIcon,
  MdCreateNewFolder as AddDirectoryIcon
} from 'react-icons/md'
import { GoPencil as EditIcon } from 'react-icons/go'

export const Icon = styled.div`
  position: relative;
  display: inline-block;
  transition: 0.3s ease color;
  color: ${props =>
    props.theme.light ? '#6c6c6c' : 'rgba(255, 255, 255, 0.5)'};
  padding-left: 0.5rem;
  &:hover {
    color: ${props =>
      props.theme.light ? 'black' : 'rgba(255, 255, 255, 0.5)'};
  }
`

export const Container = styled.div`
  display: flex;
  vertical-align: middle;
  line-height: 1;
  align-items: center;
`

const handleClick = func => e => {
  e.preventDefault()
  e.stopPropagation()
  func()
}

export interface Props {
  hovering: boolean
  active?: boolean
  onCreateFile: () => void
  onEdit?: () => void
  onDelete?: () => void
  forceShow?: boolean
}

const EditIcons: React.FunctionComponent<Props> = ({
  hovering,
  onDelete,
  onEdit,
  onCreateFile,
  active,
  forceShow
}) => {
  return (
    <React.Fragment>
      {(hovering || active || forceShow) && (
        <React.Fragment>
          {onEdit && (
            <Icon onClick={handleClick(onEdit)}>
              <EditIcon />
            </Icon>
          )}
          {onCreateFile && (
            <Icon onClick={handleClick(onCreateFile)}>
              <AddFileIcon />
            </Icon>
          )}
          {onDelete && (
            <Icon onClick={handleClick(onDelete)}>
              <CrossIcon />
            </Icon>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default EditIcons

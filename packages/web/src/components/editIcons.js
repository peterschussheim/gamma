import React from 'react'
import styled from '@emotion/styled'

import { MdClear as CrossIcon } from 'react-icons/md'
import { GoPencil as EditIcon } from 'react-icons/go'
import { MdInsertDriveFile as AddFileIcon } from 'react-icons/md'
import { MdCreateNewFolder as AddDirectoryIcon } from 'react-icons/md'
import { Tooltip } from 'react-tippy'

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

function EditIcons({
  className,
  hovering,
  onDelete,
  onEdit,
  onCreateFile,
  onCreateDirectory,
  active,
  forceShow
}) {
  // Phones need double click if we show elements on click, that's why we only want
  // to show these edit icons when the user clicks and hasn't activated the module
  if (window.__isTouch && !active && !forceShow) {
    return null
  }

  return (
    <div className={className}>
      {(hovering || (window.__isTouch && active) || forceShow) && (
        <Container>
          {onEdit && (
            <Tooltip title="Rename">
              <Icon onClick={handleClick(onEdit)}>
                <EditIcon />
              </Icon>
            </Tooltip>
          )}
          {onCreateFile && (
            <Tooltip title="New File">
              <Icon onClick={handleClick(onCreateFile)}>
                <AddFileIcon />
              </Icon>
            </Tooltip>
          )}
          {onCreateDirectory && (
            <Tooltip title="New Directory">
              <Icon onClick={handleClick(onCreateDirectory)}>
                <AddDirectoryIcon />
              </Icon>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
              <Icon onClick={handleClick(onDelete)}>
                <CrossIcon />
              </Icon>
            </Tooltip>
          )}
        </Container>
      )}
    </div>
  )
}

export default EditIcons

import styled from '@emotion/styled'

const SidebarContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const FileListContainer = styled.div`
  overflow: hidden;
  height: 500px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Description = styled.span`
  font-size: 11px;
  margin: 0px 15px 5px 5px;
  color: white;
  outline: 1px dotted #e73;
`

const SidebarItem = styled.div`
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0px 20px;
  font-size: 9px;
  border-style: dotted;
  border-width: thin;
  border-color: #ffffff00;
  &:active {
    background-color: #0e2840;
  }
  &:hover {
    border-style: dotted;
    border-width: thin;
    border-color: #2c4367;
  }
`

export { SidebarContainer, FileListContainer, Description, SidebarItem }

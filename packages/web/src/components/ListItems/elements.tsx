import styled from '@emotion/styled'

const Description = styled.input`
  font-size: 11px;
  margin: 0px 15px 5px 5px;
  color: white;
  outline: 1px dotted #e73;
`

const ListItem = styled.div`
  display: flex;
  cursor: pointer;
  color: white;
  padding: 0px 21px;
  font-size: 9px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  border-style: dotted;
  border-width: thin;
  border-color: #ffffff00;
  ${({ active }) =>
    active &&
    `
    background: #0e2840;
  `}
  &:hover {
    border-style: dotted;
    border-width: thin;
    border-color: #2c4367;
  }
`
export { Description, ListItem }

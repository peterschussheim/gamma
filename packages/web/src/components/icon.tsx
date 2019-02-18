import * as React from 'react'

import { getIconForFile } from 'vscode-icons-js'

interface Props {
  filename: string
  height: number
  marginTop?: number
  marginRight?: number
  onClick?: () => void
}

export const Icon: React.FunctionComponent<Props> = ({
  filename = 'index.js',
  height,
  marginTop = 0,
  marginRight = 0,
  onClick
}) => {
  let iconName
  try {
    iconName = getIconForFile(filename)
  } catch (error) {
    return null
  }
  const iconPath = require(`../../public/icons/${iconName}`)
  return (
    <img
      onClick={onClick}
      style={{ height, marginTop, marginRight }}
      src={iconPath}
      alt="file-type"
    />
  )
}

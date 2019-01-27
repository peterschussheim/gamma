import * as React from 'react'

import { getIconForFile } from 'vscode-icons-js'

interface Props {
  filename: string
  height: number
  onClick?: () => void
}

export const Icon: React.FunctionComponent<Props> = ({
  filename = 'index.js',
  height,
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
    <img onClick={onClick} style={{ height }} src={iconPath} alt="file-type" />
  )
}

import * as React from 'react'

import { getIconForFile } from 'vscode-icons-js'

export default function Icon({ filename = 'index.js', height }) {
  let iconName
  try {
    iconName = getIconForFile(filename)
  } catch (error) {
    return null
  }
  const iconPath = require(`../../public/icons/${iconName}`)
  return <img style={{ height }} src={iconPath} alt="file-type" />
}

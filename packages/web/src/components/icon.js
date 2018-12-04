import React from 'react'

import { getIconForFile } from 'vscode-icons-js'

export default function Icon({ name, height }) {
  const iconName = getIconForFile(name)
  const iconPath = require(`../../public/icons/${iconName}`)
  return <img style={{ height }} src={iconPath} alt="file-type" />
}

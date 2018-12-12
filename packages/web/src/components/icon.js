import React from 'react'

import { getIconForFile } from 'vscode-icons-js'

export default function Icon({ filename = 'index.js', height }) {
  const iconName = getIconForFile(filename)
  const iconPath = require(`../../public/icons/${iconName}`)
  return <img style={{ height }} src={iconPath} alt="file-type" />
}

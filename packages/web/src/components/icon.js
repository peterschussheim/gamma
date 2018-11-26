import React from 'react'

import { getIconForFile } from 'vscode-icons-js'

export default function Icon({ name }) {
  const iconName = getIconForFile(name)
  const iconPath = require(`../../static/icons/${iconName}`)
  return <img style={{ height: 20 }} src={iconPath} alt="file-type" />
}

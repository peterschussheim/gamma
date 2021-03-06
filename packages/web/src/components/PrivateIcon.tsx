import * as React from 'react'

interface Props {
  isPublic: boolean
  height: number
  marginTop?: number
  marginRight?: number
  onClick?: () => void
}

const SecretIcon: React.FunctionComponent<Props> = ({
  isPublic,
  height,
  marginTop = 0,
  marginRight = 0,
  onClick
}) => {
  const iconPath = require(`../../public/icons/eye-disabled.svg`)
  return isPublic ? null : (
    <img
      onClick={onClick}
      style={{ height, marginTop, marginRight }}
      src={iconPath}
      title={'Secret Gist'}
      alt="secret-gist"
    />
  )
}

export default SecretIcon

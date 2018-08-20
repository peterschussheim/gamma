import React from 'react'
import ViewError from '../viewError'
import ErrorBoundary from './ErrorBoundary'
import SettingsFallback from './SettingsFallback'

const BlueScreen = () => {
  return (
    <ViewError
      heading={'Something went wrong'}
      subheading={'Please try again later'}
      refresh
    />
  )
}

export { ErrorBoundary, SettingsFallback }
export default BlueScreen

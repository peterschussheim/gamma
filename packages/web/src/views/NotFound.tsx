import * as React from 'react'
import Status from './Status'

const NotFound: React.FC<{ code?: number }> = ({ code = 404 }) => (
  <Status code={code}>
    <h1>404, oops</h1>
  </Status>
)

export default NotFound

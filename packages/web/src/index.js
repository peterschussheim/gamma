/* eslint-disable import/first */
require('dotenv').config()
const debug = require('debug')('web:entry')

import http from 'http'
import Loadable from 'react-loadable'
import app from './server/index'
const server = http.createServer(app)

let currentApp = app

Loadable.preloadAll().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    debug(`Rendering service running at http://localhost:${process.env.PORT}`)
  })
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server/index', () => {
    console.log('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server/index').default
    server.on('request', newApp)
    currentApp = newApp
  })
}

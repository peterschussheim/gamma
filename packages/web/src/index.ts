/* eslint-disable import/first */
require('now-env')
const debug = require('debug')('web:entry')
import express from 'express'

let app = require('./server').default

const port = process.env.PORT || 3000

if (module.hot) {
  module.hot.accept('./server', () => {
    debug('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  debug('✅  Server-side HMR Enabled!')
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, err => {
    if (err) {
      console.error(err)
      return
    }
    debug(`SSR service Started on port ${port}`)
  })

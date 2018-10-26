/* eslint-disable import/first */
require('now-env')
const debug = require('debug')('web:entry')
import express from 'express'

let app = require('./server').default

const port = process.env.PORT || 3000

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.log('✅  Server-side HMR Enabled!')
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err)
      return
    }
    console.log(`SSR service Started on port ${port}`)
  })

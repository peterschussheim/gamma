/* eslint-disable import/first */
const debug = require('debug')('web:renderer:handler')
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import 'cross-fetch/polyfill'
import util from 'util'
import Raven from 'shared/src/raven'

// Browser shim has to come before any client imports
import './browser-shim'
import { getFooter, getHeader } from './html-template'
const assets = require(process.env.GAMMA_ASSETS_MANIFEST)
// import createCacheStream from '../create-cache-stream'
import Routes from '../../routes'

import { API_URI } from '../../constants'
import { client } from '../../config/apollo'
console.log(`[SERVER] apollo ssr enabled: ${client.ssrMode}`)

const renderer = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  debug(`server-side rendering path: ${util.inspect(req.url)}`)
  debug(`Rendering service querying API at ${API_URI}`)

  let modules = []
  const report = moduleName => {
    modules.push(moduleName)
  }
  let routerContext = {}
  let helmetContext = {}

  const frontend = (
    <Loadable.Capture report={report}>
      <ApolloProvider client={client}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={req.url} context={routerContext}>
            <Routes currentUser={req.user} />
          </StaticRouter>
        </HelmetProvider>
      </ApolloProvider>
    </Loadable.Capture>
  )

  debug('get data from tree')
  getDataFromTree(frontend)
    .then(() => {
      debug('got data from tree')
      if (routerContext.url) {
        debug('found redirect on frontend, redirecting')
        // Somewhere a `<Redirect>` was rendered, so let's redirect server-side
        res.redirect(301, routerContext.url)
        return
      }

      res.status(200)

      const data = client.extract()
      const { helmet } = helmetContext
      debug('write header')
      let response = res
      // TODO: uncomment when cache is implemented
      // if (!req.user) {
      //   response = createCacheStream(req.path)
      //   response.pipe(res)
      // }

      response.write(
        getHeader({
          metaTags:
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString()
        })
      )

      const stream = renderToNodeStream(frontend)

      stream.pipe(
        response,
        { end: false }
      )

      const stats = require('../../../build/react-loadable.json')
      const bundles = getBundles(stats, modules)
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'))

      debug('chunks used:', util.inspect(chunks))

      stream.on('end', () =>
        response.end(
          getFooter({
            data,
            chunks
          })
        )
      )
    })
    .catch(err => {
      console.error(err)
      const sentryId =
        process.env.NODE_ENV === 'production'
          ? Raven.captureException(err)
          : 'Only output in production.'
      res.status(500)
      res.send(
        `Oops, something went wrong. Please try again! (Error ID: ${sentryId})`
      )
    })
}

export default renderer

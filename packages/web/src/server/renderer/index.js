/* eslint-disable import/first */
const debug = require('debug')('web:renderer:handler')
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import Raven from 'shared/src/raven'
import 'cross-fetch/polyfill'
// Browser shim has to come before any client imports
import './browser-shim'
import { getFooter, getHeader } from './html-template'
const assets = require(process.env.GAMMA_ASSETS_MANIFEST)
// import createCacheStream from '../create-cache-stream'

import Routes from '../../routes'
const util = require('util')
const FORCE_DEV = process.env.FORCE_DEV
const IS_PROD = process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV

// if (!IS_PROD || FORCE_DEV) debug(`Querying API at ${API_URI}`)

export const clearApolloStore = apolloClient => {
  try {
    apolloClient.resetStore()
  } catch (e) {
    debug(`Error clearing apollo store: ${e}`)
  }
}

const renderer = (req, res) => {
  const API_URI = IS_PROD
    ? `https://${req.hostname}/api`
    : 'http://localhost:4000/api'
  const WS_URI = IS_PROD
    ? `wss://${window.location.host}/subscriptions`
    : 'ws://localhost:4000/subscriptions'
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  debug(`server-side render ${util.inspect(req.url)}`)
  debug(`Rendering querying API at ${API_URI}`)

  const httpLink = createHttpLink({
    uri: API_URI,
    credentials: 'include',
    headers: {
      cookie: req.headers.cookie
    }
  })

  const cache = new InMemoryCache({})

  // Create an Apollo Client with a local network interface
  const client = new ApolloClient({
    ssrMode: true,
    link: httpLink,
    cache
  })

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
      // // Create <script defer> tags from bundle objects
      // .map(bundle => `/${bundle.file.replace(/\.map$/, '')}`)
      // // Make sure only unique bundles are included
      // .filter((value, index, self) => self.indexOf(value) === index)
      debug('bundles used:', bundles.join(','))
      stream.on('end', () =>
        response.end(
          getFooter({
            data,
            bundles,
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

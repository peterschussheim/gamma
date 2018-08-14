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

// import Raven from 'shared'
import stats from 'stats'

import { getFooter, getHeader } from './html-template'
import createCacheStream from '../create-cache-stream'

// Browser shim has to come before any client imports
import './browser-shim'
const debug = require('debug')('renderer:index')
const Routes = require('../../../web/src/routes').default

const IS_PROD = process.env.NODE_ENV === 'production'
const FORCE_DEV = process.env.FORCE_DEV

if (!IS_PROD || FORCE_DEV) debug('Querying API at localhost:4001/api')

const renderer = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  debug(`server-side render ${req.url}`)
  debug(`querying API at https://${req.hostname}/api`)

  const httpLink = createHttpLink({
    uri:
      IS_PROD && !FORCE_DEV
        ? `https://${req.hostname}/api`
        : 'http://localhost:4000/api',
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
      if (!req.user) {
        response = createCacheStream(req.path)
        response.pipe(res)
      }

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

      const bundles = getBundles(stats, modules)
        // Create <script defer> tags from bundle objects
        .map(bundle => `/${bundle.file.replace(/\.map$/, '')}`)
        // Make sure only unique bundles are included
        .filter((value, index, self) => self.indexOf(value) === index)
      debug('bundles used:', bundles.join(','))
      stream.on('end', () =>
        response.end(
          getFooter({
            data,
            bundles
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

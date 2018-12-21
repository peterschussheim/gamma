/* eslint-disable import/first */
const debug = require('debug')('web:renderer:middleware')
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { renderStylesToNodeStream } from 'emotion-server'
// import { cache as styleCache } from 'emotion'
// import { CacheProvider } from '@emotion/core'
import 'cross-fetch/polyfill'
import util from 'util'
import Raven from 'shared/src/raven'

// Browser shim has to come before any client imports
import './browser-shim'
import template from './html-template'
const assets = require(process.env.GAMMA_ASSETS_MANIFEST)
import Routes from '../../routes'
import { EditorProvider } from '../../components/EnhancedEditors/EditorContext'

const stats = require('../../../build/react-loadable.json')

import { API_URI } from '../../constants'
import { cache, errorLink, requestLink } from '../../apollo'

const renderer = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  debug(`server-side rendering path: ${util.inspect(req.url)}`)
  debug(`Rendering service querying API at ${API_URI}`)

  let modules = []
  let routerContext = {}
  let helmetContext = {}

  const links = [errorLink, requestLink]
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from(links),
    cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache
  })

  const frontend = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ApolloProvider client={client}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={req.url} context={routerContext}>
            <EditorProvider>
              <Routes currentUser={req.user} />
            </EditorProvider>
          </StaticRouter>
        </HelmetProvider>
      </ApolloProvider>
    </Loadable.Capture>
  )
  // class App extends React.Component {
  //   state = {
  //     activeFile: null
  //   }
  //   render() {
  //     return (
  //       <Loadable.Capture report={moduleName => modules.push(moduleName)}>
  //         <ApolloProvider client={client}>
  //           <HelmetProvider context={helmetContext}>
  //             <StaticRouter location={req.url} context={routerContext}>
  //               <Routes currentUser={req.user} />
  //             </StaticRouter>
  //           </HelmetProvider>
  //         </ApolloProvider>
  //       </Loadable.Capture>
  //     )
  //   }
  // }

  debug('get data from tree')
  getDataFromTree(frontend)
    .then(() => {
      debug('got data from tree')
      if (routerContext.url) {
        debug('found redirect on frontend, redirecting')
        res.redirect(301, routerContext.url)
        return
      }

      res.status(200)

      const data = client.extract()
      const { helmet } = helmetContext

      let response = res

      /**
       * TODO:
       *
       * Figure out what `bundles` and `scripts` returns
       */
      const bundles = getBundles(stats, modules)
      const scripts = bundles
        .filter(bundle => bundle.file.endsWith('.js'))
        .map(bundle => bundle.file)
        .filter((bundle, pos, self) => self.indexOf(bundle) === pos)
      const staticBuild =
        process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001/'
      debug('bundles: ', bundles)
      debug('scripts: ', scripts)
      debug('staticBuild: ', staticBuild)
      const { header, footer } = template({
        helmet,
        data,
        assets,
        scripts,
        staticBuild
      })

      response.write(header)

      const stream = renderToNodeStream(frontend).pipe(
        renderStylesToNodeStream()
      )

      stream.pipe(
        response,
        { end: false }
      )

      stream.on('end', () => response.end(footer))
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

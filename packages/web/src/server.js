import React from 'react'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import 'cross-fetch/polyfill'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

import '../server/renderer/browser-shim'
import stats from '../build/react-loadable.json'
import { Layout } from './routes/layout'
const assets = require(process.env.GAMMA_ASSETS_MANIFEST)

const NODE_ENV = process.env.NODE_ENV || 'development'

const IS_PROD = process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
const API_URI = IS_PROD ? '/api' : 'http://localhost:4000/api'
const WS_URI = IS_PROD
  ? `wss://${window.location.host}/subscriptions`
  : 'ws://localhost:4000/subscriptions'

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.GAMMA_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {}
    const modules = []

    const httpLink = createHttpLink({
      uri:
        IS_PROD && !FORCE_DEV
          ? `https://${req.hostname}/api`
          : 'http://localhost:3001/api',
      credentials: 'include',
      headers: {
        cookie: req.headers.cookie
      }
    })

    const client = new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
    })

    const markup = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <ApolloProvider client={client}>
          <StaticRouter context={context} location={req.url}>
            <Layout />
          </StaticRouter>
        </ApolloProvider>
      </Loadable.Capture>
    )

    if (context.url) {
      res.redirect(context.url)
    } else {
      const bundles = getBundles(stats, modules)
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'))

      res.status(200).send(
        `<!doctype html>
<html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Welcome to gamma</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
    }
  </head>
  <body>
    <div id="root">${markup}</div>
    ${
      process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}"></script>`
        : `<script src="${assets.client.js}" crossorigin></script>`
    }
    ${chunks
      .map(
        chunk =>
          process.env.NODE_ENV === 'production'
            ? `<script src="/${chunk.file}"></script>`
            : `<script src="http://${process.env.HOST}:${parseInt(
                process.env.PORT,
                10
              ) + 1}/${chunk.file}"></script>`
      )
      .join('\n')}
    <script>window.main();</script>
  </body>
</html>`
      )
    }
  })

export default server

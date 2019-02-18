const debug = require('debug')('web:renderer:middleware')
import * as React from 'react'

// Browser shim has to come before any client imports
import './browser-shim'
import { renderToString } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { StaticRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import serialize from 'serialize-javascript'
import { runtimeConfig } from '../../isomorphicVariables'
import 'cross-fetch/polyfill'
import util from 'util'
import Raven from 'shared/src/raven'

import Router from '../../Router'
import { EditorProvider } from '../../components/CodeEditor/EditorProvider'

import { API_URI } from '../../constants'
import { cache, errorLink, requestLink } from '../../apollo'

const renderer = (req, res) => {
  const assets = require(process.env.GAMMA_ASSETS_MANIFEST)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  debug(`server-side rendering path: ${util.inspect(req.url)}`)
  debug(`Rendering service querying API at ${API_URI}`)

  let context = {}

  const cookies = req.cookies
  debug(cookies)

  const links = [errorLink, requestLink]
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from(links),
    cache: window.__DATA__ ? cache.restore(window.__DATA__) : cache
  })

  getDataFromTree(
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <EditorProvider>
          <Router
            cookie={cookies}
            data={{ type: 'success' }}
            location={req.url}
            currentUser={req.user}
          />
        </EditorProvider>
      </StaticRouter>
    </ApolloProvider>
  )
    .then(() => {
      const data = client.extract()
      const markup = renderToString(
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={context}>
            <EditorProvider>
              <Router
                cookie={cookies}
                data={data}
                location={req.url}
                currentUser={req.user}
              />
            </EditorProvider>
          </StaticRouter>
        </ApolloProvider>
      )
      const helmet = Helmet.renderStatic()
      if (context.url) {
        res.redirect(context.url)
      } else {
        res.status(200).send(
          `<!DOCTYPE html>
      <html lang="" ${helmet.htmlAttributes.toString()}>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="og:type" content="website">
            <meta name="og:site_name" content="gamma.app">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs/loader.js"></script>
            <script>
              require.config({
                paths: {
                  'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.15.6/min/vs'
                }
              });
              window.MonacoEnvironment = {
                getWorkerUrl: function (workerId, label) {
                  return '/worker-loader-proxy.js';
                }
              };
              require(["vs/editor/editor.main"], function () {})
            </script>
            <script>
                !function(e,a,t,n,g,c,o){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.defer=1,c.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(c,o)}(window,document,"script",0,"ga"),ga("create","UA-123019519-1","auto"),ga("send","pageview"),ga('set', 'anonymizeIp', true)
            </script>
          </head>
          <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
            <script>window.env = ${serialize(runtimeConfig)};</script>
            <script >window.__DATA__=${serialize(data)}</script>
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}"></script>`
            : `<script src="${assets.client.js}" crossorigin></script>`
        }
          </body>
        </html>`
        )
      }
    })
    .catch(err => {
      console.error(err)
      const sentryId =
        process.env.NODE_ENV === 'production'
          ? Raven.captureException(err)
          : 'Only output in production.'
      res.status(500)
      res.send(
        `Something went wrong. Please try again! (Error ID: ${sentryId})`
      )
    })
}

export default renderer

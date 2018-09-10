/* eslint-disable import/first */
const debug = require('debug')('ssr:html-template')
import fs from 'fs'
import path from 'path'
import { html } from 'common-tags'
import serialize from 'serialize-javascript'

// Match main.asdf123.js in production mode or bundle.js in dev mode
const mainBundleRegex = /(main|bundle)\.(?:.*\.)?js$/

const assets = require(process.env.GAMMA_ASSETS_MANIFEST)
const scripts = Object.keys(assets).reduce((scripts, key) => {
  return (
    scripts +
    `<script type="text/javascript" src="${
      assets[key].js
    }" defer crossorigin></script>`
  )
}, '')

console.log(scripts)

export const createScriptTag = ({ src }) =>
  `<script defer="defer" src="${src}"></script>`

export const getHeader = ({ metaTags }) => {
  return html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="og:type" content="website">
          <meta name="og:site_name" content="gamma.app">
          ${metaTags}
          ${scripts}
          <script>
              !function(e,a,t,n,g,c,o){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.defer=1,c.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(c,o)}(window,document,"script",0,"ga"),ga("create","UA-123019519-1","auto"),ga("send","pageview"),ga('set', 'anonymizeIp', true)
          </script>
        </head>
        <body>
          <div id="root">`
}

export const getFooter = ({ state, data, chunks }) => {
  return html`</div>
      <script>window.__SERVER_STATE__=${serialize(state)}</script>
      <script>window.__DATA__=${serialize(data)}</script>
      <script defer="defer" type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Symbol.iterator"></script>
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.vendor.js}" defer></script>`
          : `<script src="${assets.vendor.js}" defer crossorigin></script>`
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
      ${chunks
        .map(
          chunk =>
            process.env.NODE_ENV === 'production'
              ? `<script src="/${chunk.file} defer"></script>`
              : `<script src="http://${process.env.HOST}:${parseInt(
                  process.env.PORT,
                  10
                ) + 1}/${chunk.file}" defer crossorigin></script>`
        )
        .join('\n')}
      <script>window.main();</script>
    </body>
    </html>
  `
}

// ${
//   process.env.NODE_ENV === 'production'
//     ? `<script src="${assets.manifest.js}" defer></script>`
//     : `<script src="${assets.manifest.js}" defer crossorigin></script>`
// }
// ${
//   process.env.NODE_ENV === 'production'
//     ? `<script src="${assets.vendor.js}" defer></script>`
//     : `<script src="${assets.vendor.js}" defer crossorigin></script>`
// }
// ${
//   process.env.NODE_ENV === 'production'
//     ? `<script src="${assets.client.js}" defer></script>`
//     : `<script src="${assets.client.js}" defer crossorigin></script>`
// }

// /* eslint-disable import/first */
// const debug = require('debug')('ssr:html-template')
// import fs from 'fs'
// import path from 'path'
// import { html } from 'common-tags'
// import serialize from 'serialize-javascript'

// // Match main.asdf123.js in production mode or bundle.js in dev mode
// const mainBundleRegex = /(main|bundle)\.(?:.*\.)?js$/

// export const createScriptTag = ({ src }) =>
//   `<script type="text/javascript" defer="defer" src="${src}"></script>`

// export const getHeader = ({ metaTags }) => {
//   return html`
//       <!DOCTYPE html>
//       <html lang="en">
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width,initial-scale=1">
//           <meta name="og:type" content="website">
//           <meta name="og:site_name" content="gamma.app">
//           ${metaTags}
//           <script>
//               !function(e,a,t,n,g,c,o){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.defer=1,c.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(c,o)}(window,document,"script",0,"ga"),ga("create","UA-123019519-1","auto"),ga("send","pageview"),ga('set', 'anonymizeIp', true)
//           </script>
//         </head>
//         <body>
//           <div id="root">`
// }

// export const getFooter = ({
//   assets,
//   state = {},
//   data,
//   scripts,
//   staticBuild
// }) => {
//   return html`</div>
//   ${
//     process.env.NODE_ENV === 'production'
//       ? `<script src="${assets.client.js}"></script>`
//       : `<script src="${assets.client.js}" crossorigin></script>`
//   }
//   ${scripts
//     .map(file => `<script src="${staticBuild}${file}"></script>`)
//     .join('\n')}
//       <script>window.__SERVER_STATE__=${serialize(state)}</script>
//       <script>window.__DATA__=${serialize(data)}</script>
//       <script defer="defer" type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Symbol.iterator"></script>
//       <script>window.main();</script>
//     </body>
//     </html>
//   `
// }
export default ({ helmet, data, assets, scripts, staticBuild }) => {
  const header = `
  <!DOCTYPE html>
  <html>
      <head>
        <meta name="application-name" content="gamma UI">
        <meta name="description" content="cool">
        <meta char-set="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body>
        <div id="root">`
  const footer = `</div>
        <script type="application/javascript">window.__DATA__=${JSON.stringify(
          data
        ).replace(/</g, '\\u003c')}</script>
    ${
      process.env.NODE_ENV === 'production'
        ? `<script type="application/javascript" src="${
            assets.client.js
          }"></script>`
        : `<script src="${assets.client.js}" crossorigin></script>`
    }
    ${scripts
      .map(
        file =>
          `<script type="application/javascript" src="${staticBuild}${file}"></script>`
      )
      .join('\n')}
      <script>window.main();</script>
      </body>
    </html>`
  return { header, footer }
}

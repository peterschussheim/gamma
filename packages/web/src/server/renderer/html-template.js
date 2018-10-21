import serialize from 'serialize-javascript'
import { runtimeConfig } from '../../isomorphicVariables'
const debug = require('debug')('ssr:html-template')
const { inspect } = require('util')
// debug(`html-template: ${inspect(runtimeConfig, { depth: 5, colors: true })}`)

export default ({ helmet, data, assets, scripts, staticBuild }) => {
  const header = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="og:type" content="website">
        <meta name="og:site_name" content="gamma.app">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        <script>
            !function(e,a,t,n,g,c,o){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.defer=1,c.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(c,o)}(window,document,"script",0,"ga"),ga("create","UA-123019519-1","auto"),ga("send","pageview"),ga('set', 'anonymizeIp', true)
        </script>
      </head>
      <body>
      <div id="root">`

  const footer = `</div>
        <script>window.env = ${serialize(runtimeConfig)};</script>
        <script >window.__DATA__=${serialize(data)}</script>
    ${
      process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}"></script>`
        : `<script src="${assets.client.js}" crossorigin></script>`
    }
    ${scripts
      .map(file => `<script src="${staticBuild}${file}"></script>`)
      .join('\n')}
      <script>window.main();</script>
      </body>
    </html>`

  return { header, footer }
}

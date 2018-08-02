import React from 'react'
import serialize from 'serialize-javascript'

export const Html = ({ content, client: { cache } }) => (
  <html>
    <head>
      <title>gamma.app</title>
      <script src="/static/bundle.js" charSet="UTF-8" defer />
      {/* <script>window.__INITIAL_DATA__ = ${serialize(data)}</script> */}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(cache.extract())};`
        }}
      />
    </body>
  </html>
)

// export const Html = ({ content, client: { cache } }) => (
//   <html lang="en">
//     <head>
//       <meta charSet="utf-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />

//       <title>gamma</title>
//     </head>
//     <body>
//       <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
//       <script
//         charSet="UTF-8"
//         dangerouslySetInnerHTML={{
//           __html: `window.__APOLLO_STATE__=${JSON.stringify(cache.extract())};`
//         }}
//       />
//       <script src="/static/bundle.js" charSet="UTF-8" />
//     </body>
//   </html>
// )

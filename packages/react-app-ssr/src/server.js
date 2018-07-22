import Express from 'express'
import path from 'path'
import proxy from 'http-proxy-middleware'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import ApolloClient from 'apollo-client'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import fetch from 'cross-fetch'

import {
  errorLink,
  subscriptionLink,
  requestLink,
  queryOrMutationLink
} from './links'
import { Html } from './routes/html'
import { Layout } from './routes/layout'

let PORT = 3000
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10)
}

const NODE_ENV = process.env.NODE_ENV || 'development'
const API_HOST =
  NODE_ENV !== 'production' ? 'http://localhost:4000' : 'https://api.gamma.app'

const app = new Express()

const apiProxy = proxy({ target: API_HOST, changeOrigin: true })
app.use('/graphql', apiProxy)
app.use('/login', apiProxy)
app.use('/logout', apiProxy)

if (process.env.NODE_ENV === 'production') {
  /**
   * If production, serve JavaScript from server FS
   */
  app.use('/static', Express.static(path.join(process.cwd(), 'build/client')))
} else {
  /**
   * In developement, proxy webpack dev server
   */
  app.use(
    '/static',
    proxy({ target: 'http://localhost:3020', pathRewrite: { '^/static': '' } })
  )
}

app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      errorLink,
      queryOrMutationLink({
        fetch,
        uri: `${API_HOST}/graphql`,
        credentials: 'include',
        headers: {
          cookie: req.headers.cookie
        }
      })
    ]),
    cache: new InMemoryCache()
  })

  const context = {}

  const component = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  )

  renderToStringWithData(component)
    .then(content => {
      res.status(200)
      const html = <Html content={content} client={client} />
      res.send(`<!doctype html>\n${renderToString(html)}`)
      res.end()
    })
    .catch(e => {
      console.error('RENDERING ERROR:', e)
      res.status(500)
      res.end(`An error occurred:\n\n${e.stack}`)
    })
})

app.listen(PORT, () =>
  console.log(`App Server is now running on http://localhost:${PORT}`)
)

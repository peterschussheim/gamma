import * as React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { MonacoUtils } from './monaco-utils'
import App from './App'

const root = document.getElementById('root')

window.main = () => {
  render(App)
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    render(NewApp)
  })
}

async function render(Root) {
  try {
    await MonacoUtils.initialize()
    await import(/* webpackChunkName: "monaco-languages" */ 'monaco-editor')
  } catch (e) {
    console.error('Error loading monaco', e)
  }
  Loadable.preloadReady()
    .then(() => {
      ReactDOM.hydrate(<Root />, root)
    })
    .catch(err => {
      console.error(`Error hydrating react client app: ${err}`)
    })
}

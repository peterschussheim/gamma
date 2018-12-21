import * as React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { MonacoUtils } from './monaco-utils'
import App from './App'

//  { label: 'html',
// entry:
//   [ 'vs/basic-languages/html/html.contribution',
//     'vs/language/html/monaco.contribution',
//     [length]: 2 ],
// worker:
//   { id: 'vs/language/html/htmlWorker',
//     entry: 'vs/language/html/html.worker',
//     output: 'html.worker.js',
//     fallback: 'vs/language/html/htmlWorker' },

const root = document.getElementById('root')
// self.MonacoEnvironment = {
//   getWorkerUrl: function(moduleId, label) {
//     switch (label) {
//       case 'json':
//         return require('blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor/esm/vs/language/json/json.worker')
//       case 'css':
//         return require('blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor/esm/vs/language/css/css.worker')
//       case 'html':
//         return require('blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor/esm/vs/language/html/html.worker')
//       case 'typescript':
//       case 'javascript':
//         return require('blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor/esm/vs/language/typescript/ts.worker')
//       default:
//         return require('blob-url-loader?type=application/javascript!compile-loader?target=worker&emit=false!monaco-editor/esm/vs/editor/editor.worker')
//     }
//   }
// }

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
    // await import(/* webpackChunkName: "monaco-languages" */ 'monaco-editor')
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

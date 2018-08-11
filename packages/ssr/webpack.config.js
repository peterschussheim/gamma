const debug = require('debug')('build:ssr')
const path = require('path')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const WebpackBar = require('webpackbar')

const dir = process.env.DIR

// if (!dir) throw new Error('Define entry point using -d option')
// debug(`> Building ${dir}, entry: ${dir}/index.js, output: build-${dir}/main.js`)
process.env.NODE_ENV = 'development'
module.exports = {
  mode: 'development',
  target: 'async-node',
  externals: {
    'prisma-binding': 'prisma-binding',
    express: 'express',
    lodash: 'lodash',
    'cross-fetch': 'cross-fetch',
    shared: 'shared'
  },
  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, 'build'),
    filename: 'ssr-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { targets: { node: 'current' } }], 'react']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, 'build', 'react-loadable.json')
    }),
    new WebpackBar({
      color: '#c065f4',
      name: 'server'
    })
    // new WebpackBar({
    //   color: target === 'web' ? '#f56be2' : '#c065f4',
    //   name: target === 'web' ? 'client' : 'server'
    // })
  ]
}

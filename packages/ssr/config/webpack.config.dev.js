const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const common = require('./webpack.common.js')

const ROOT_DIR = path.resolve(__dirname, '../')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  entry: [require.resolve('react-dev-utils/webpackHotDevClient')],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: ROOT_DIR
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

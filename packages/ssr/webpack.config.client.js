var webpack = require('webpack')
var path = require('path')
const Dotenv = require('dotenv-webpack')

const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  bail: !DEV,
  devtool: DEV ? 'cheap-module-source-map' : 'source-map',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEV ? 'development' : 'production')
      }
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    !DEV &&
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: true,
          screw_ie8: true
        }
      }),
    DEV && new webpack.optimize.AggressiveMergingPlugin()
  ].filter(Boolean)
}
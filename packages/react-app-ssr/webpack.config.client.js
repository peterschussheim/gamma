var path = require('path');
var webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';

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
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
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
};
// var browserConfig = {
//   entry: './src/browser/index.js',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [{ test: /\.(js)$/, use: 'babel-loader' }]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       __isBrowser__: 'true'
//     })
//   ]
// }

// var serverConfig = {
//   entry: './src/server/index.js',
//   target: 'node',
//   externals: [nodeExternals()],
//   output: {
//     path: __dirname,
//     filename: 'server.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [{ test: /\.(js)$/, use: 'babel-loader' }]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       __isBrowser__: 'false'
//     })
//   ]
// }

// module.exports = [browserConfig, serverConfig]

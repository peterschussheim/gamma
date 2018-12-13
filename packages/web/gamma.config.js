const makeLoaderFinder = require('gamma-core/dev-utils/makeLoaderFinder')
const WorkerPlugin = require('worker-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const scssPlugin = new ExtractTextPlugin(
  'static/css/[name].[contenthash:8].css'
)
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

const babelLoaderFinder = makeLoaderFinder('babel-loader')
const tsLoaderFinder = makeLoaderFinder('ts-loader')
const eslintLoaderFinder = makeLoaderFinder('eslint-loader')

module.exports = {
  modify: (baseConfig, { target, dev }, webpack) => {
    const config = Object.assign({}, baseConfig)

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx'
    ])

    config.devtool = 'cheap-module-source-map'

    const babelLoader = config.module.rules.find(babelLoaderFinder)
    if (!babelLoader) {
      throw new Error(
        `'babel-loader' was erased from config, we need it to define 'include' option for 'ts-loader'`
      )
    }

    // Get the correct `include` option, since that hasn't changed.
    // This tells gamma-core which directories to transform.
    const { include } = babelLoader

    // Declare our TypeScript loader configuration
    const tsLoader = {
      include,
      test: /\.tsx?$/,
      use: [
        dev && { loader: 'cache-loader' },
        dev && {
          loader: 'thread-loader',
          options: {
            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
            workers: 2
          }
        },
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
          }
        }
      ].filter(x => x)
    }

    // Fully replace babel-loader with ts-loader
    config.module.rules[babelLoader] = tsLoader

    if (target === 'web') {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          checkSyntacticErrors: true,
          formatter: 'codeframe',
          tslint: './tslint.json',
          watch: './src',
          workers: 2
        })
      )
      config.plugins.push(new WorkerPlugin())
      config.plugins.push(
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json'
        })
      )
      // config.plugins.push(new BundleAnalyzerPlugin());
    }

    if (target === 'web') {
      config.module.rules.push(
        dev
          ? {
              test: /.scss$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: false,
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                    plugins: () => [
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9' // React doesn't support IE8 anyway
                        ]
                      })
                    ]
                  }
                },
                'sass-loader'
              ]
            }
          : {
              test: /.scss$/,
              use: scssPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      minimize: true,
                      importLoaders: 1
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                      plugins: () => [
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                          ]
                        })
                      ]
                    }
                  },
                  'sass-loader'
                ]
              })
            }
      )

      config.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:7].js'

      config.entry.vendor = [
        require.resolve('gamma-core/polyfills'),
        require.resolve('react'),
        require.resolve('react-dom'),
        require.resolve('react-router-dom'),
        require.resolve('react-helmet-async'),
        require.resolve('formik'),
        require.resolve('yup')
      ]

      // config.plugins.push(
      //   new webpack.optimize.CommonsChunkPlugin({
      //     names: ['vendor', 'manifest'],
      //     minChunks: Infinity
      //   })
      // )
      // // extract common modules from all the chunks (requires no 'name' property)
      // config.plugins.push(
      //   new webpack.optimize.CommonsChunkPlugin({
      //     async: true,
      //     children: true,
      //     minChunks: 4
      //   })
      // )

      // config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

      if (!dev) {
        config.plugins.push(scssPlugin)
      }
    } else {
      config.module.rules.push({
        test: /.scss$/,
        use: 'css-loader'
      })
    }

    return config
  }
}

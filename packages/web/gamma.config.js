const makeLoaderFinder = require('gamma-core/dev-utils/makeLoaderFinder')
const WorkerPlugin = require('worker-plugin')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const babelLoaderFinder = makeLoaderFinder('babel-loader')
const eslintLoaderFinder = makeLoaderFinder('eslint-loader')

const defaultOptions = {
  useBabel: true,
  useEslint: false,
  tsLoader: {
    transpileOnly: true,
    experimentalWatchApi: true
  },
  forkTsChecker: {
    tsconfig: './tsconfig.json',
    tslint: './tslint.json',
    watch: ['./src'],
    // TODO: fix errors and remove below
    ignoreDiagnostics: [
      2304,
      2322,
      2339,
      2345,
      2554,
      2559,
      2349,
      2307,
      2306,
      2740,
      2741
    ],
    typeCheck: true
  }
}

module.exports = {
  modify: (baseConfig, { target, dev }, webpack) => {
    const options = Object.assign({}, defaultOptions)
    const config = Object.assign({}, baseConfig)

    config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx']

    if (!options.useBabel || !options.useEslint) {
      // Locate eslint-loader and remove it (we're using only tslint)
      config.module.rules = config.module.rules.filter(
        rule => !eslintLoaderFinder(rule)
      )
    }

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
        {
          loader: require.resolve('ts-loader'),
          options: Object.assign({}, defaultOptions.tsLoader, options.tsLoader)
        }
      ]
    }

    if (options.useBabel) {
      // If using babel, also add babel-loader to ts files,
      // so we can use babel plugins on tsx files too
      tsLoader.use = [...babelLoader.use, ...tsLoader.use]
    } else {
      // If not using babel, remove it
      config.module.rules = config.module.rules.filter(
        rule => !babelLoaderFinder(rule)
      )
    }

    config.module.rules.push(tsLoader)
    // Do typechecking in a separate process,
    // We can run it only in client builds.
    if (target === 'web') {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin(
          Object.assign({}, defaultOptions.forkTsChecker, options.forkTsChecker)
        ),
        new webpack.DefinePlugin({
          __isBrowser__: 'true'
        })
      )

      if (target === 'node') {
        config.plugins.push(
          new webpack.DefinePlugin({
            __isBrowser__: 'false'
          })
        )
      }

      config.plugins.push(new WorkerPlugin())

      if (dev) {
        // As suggested by Microsoft's Outlook team, these optimizations
        // crank up Webpack x TypeScript perf.
        // @see https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15
        config.output.pathinfo = false
        config.optimization = {
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false
        }
      }
    }

    return config
  }
}

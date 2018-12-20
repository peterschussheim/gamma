const makeLoaderFinder = require('gamma-core/dev-utils/makeLoaderFinder')
const WorkerPlugin = require('worker-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const babelLoaderFinder = makeLoaderFinder('babel-loader')
const tsLoaderFinder = makeLoaderFinder('ts-loader')
const eslintLoaderFinder = makeLoaderFinder('eslint-loader')

const defaultOptions = {
  useBabel: true,
  useEslint: true,
  tsLoader: {
    transpileOnly: true,
    experimentalWatchApi: true
  },
  forkTsChecker: {
    tsconfig: './tsconfig.json',
    tslint: './tslint.json',
    watch: ['./src'],
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
        )
      )
      config.plugins.push(new MonacoWebpackPlugin())
      config.plugins.push(new WorkerPlugin())
      config.plugins.push(
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json'
        })
      )
      config.optimization.splitChunks = {
        cacheGroups: {
          editor: {
            // Editor bundle
            test: /[\\/]node_modules\/(monaco-editor\/esm\/vs\/(nls\.js|editor|platform|base|basic-languages|language\/(css|html|json|typescript)\/monaco\.contribution\.js)|style-loader\/lib|css-loader\/lib\/css-base\.js)/,
            name: 'monaco-editor',
            chunks: 'async'
          },
          languages: {
            // Language bundle
            test: /[\\/]node_modules\/monaco-editor\/esm\/vs\/language\/(css|html|json|typescript)\/(_deps|lib|fillers|languageFeatures\.js|workerManager\.js|tokenization\.js|(tsMode|jsonMode|htmlMode|cssMode)\.js|(tsWorker|jsonWorker|htmlWorker|cssWorker)\.js)/,
            name: 'monaco-languages',
            chunks: 'async'
          }
        }
      }
      if (dev) {
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

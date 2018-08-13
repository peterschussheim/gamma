const debug = require('debug')('build:config-overrides')
const webpack = require('webpack')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const fs = require('fs')
const path = require('path')
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

// Recursively walk a folder and get all file paths
function walkFolder(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(name => {
    // Skip dot files
    if (name.indexOf('.') === 0) return

    var filePath = path.join(currentDirPath, name)
    var stat = fs.statSync(filePath)

    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory()) {
      walkFolder(filePath, callback)
    }
  })
}

const removeEslint = config => {
  config.module.rules = config.module.rules.filter(rule => {
    // Filter the eslint loader based on its options
    if (rule.use) {
      return rule.use.every(use => {
        if (!use.options) return true
        return !use.options.eslintPath
      })
    }
    return true
  })
}

module.exports = function override(config, env) {
  if (process.env.NODE_ENV === 'development') {
    config.output.path = path.join(__dirname, './build')
    config = rewireReactHotLoader(config, env)
    config.plugins.push(
      WriteFilePlugin({
        log: true,
        useHashIndex: false
      })
    )
  }
  config.plugins.push(
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json'
    })
  )
  config = injectBabelPlugin('react-loadable/babel', config)

  // Get all public files so they're cached by the SW
  let externals = []
  walkFolder('./public/', file => {
    if (file.indexOf('index.html') > -1) return
    externals.push(file.replace(/public/, ''))
  })

  config.plugins.unshift(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: 'static/js/[name].js',
      minChunks: Infinity
    })
  )

  if (process.env.NODE_ENV === 'production') {
    removeEslint(config)
  }

  return config
}

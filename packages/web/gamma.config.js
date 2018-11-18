const { ReactLoadablePlugin } = require('react-loadable/webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  modify: (config, { target }, webpack) => {
    if (target === 'web') {
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new ReactLoadablePlugin({
            filename: './build/react-loadable.json'
          }),
          new MonacoWebpackPlugin()
        ]
      }
    }

    config.resolve.modules.symlinks = true

    return config
  }
}

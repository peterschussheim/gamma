const WorkerPlugin = require('worker-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

module.exports = {
  modify: (baseConfig, { target }, webpack) => {
    const config = Object.assign({}, baseConfig)
    if (target === 'web') {
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new WorkerPlugin(),
          new ReactLoadablePlugin({
            filename: './build/react-loadable.json'
          })
        ]
      }
    }

    config.resolve.modules.symlinks = true

    return config
  }
}

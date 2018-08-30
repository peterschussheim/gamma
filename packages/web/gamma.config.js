const { ReactLoadablePlugin } = require('react-loadable/webpack')

module.exports = {
  modify: (config, { target }, webpack) => {
    if (target === 'web') {
      return {
        ...config,
        plugins: [
          ...config.plugins,
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

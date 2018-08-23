const { ReactLoadablePlugin } = require('react-loadable/webpack')

module.exports = {
  modify: (config, { target }) => {
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

    // if (target === 'server') {
    //   config.node = {
    //     fs: 'empty',
    //     module: 'empty'
    //   }
    //   return config
    // }

    return config
  }
}

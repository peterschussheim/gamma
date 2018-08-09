const transpileShared = config => {
  config.module.rules.forEach(rule => {
    if (!rule.oneOf) return

    rule.oneOf.forEach(loader => {
      if (!loader.include) return
      if (!loader.options) return
      // The loader config we're looking for is for JS files,
      // so we look whether the config has a babelrc option
      if (!Object.keys(loader.options).includes('babelrc')) return

      // Add the shared folder to the locations
      // that should be transpiled
      loader.include = [
        loader.include,
        path.resolve(__dirname, '../shared/src')
      ]
    })
  })

  return config
}

module.exports = {
  modify(config, { target, dev }, webpack) {
    config = transpileShared(config)
    console.log(config)
    return config
  }
}

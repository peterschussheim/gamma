global.window = {
  location: {
    protocol: 'https:',
    host: 'gamma.app',
    hash: ''
  }
}
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
}
global.navigator = {
  userAgent: ''
}
global.CSS = {
  escape: require('css.escape')
}
global.self = {}

global.window = {
  location: {
    protocol: 'https:',
    host: 'spectrum.chat',
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

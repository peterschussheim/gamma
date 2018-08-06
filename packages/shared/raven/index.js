const debug = require('debug')('shared:raven')
import config from '../config'
console.log(config)
const { NODE_ENV, FORCE_DEV, SENTRY_DSN_SERVER } = config
let Raven

const options = {
  autoBreadcrumbs: true,
  captureUnhandledRejections: true,
  environment: NODE_ENV
}

if (NODE_ENV === 'production' && !FORCE_DEV && SENTRY_DSN_SERVER) {
  debug(`Raven installed in ${NODE_ENV} environment`)
  Raven = require('raven')
  Raven.config(SENTRY_DSN_SERVER, options).install()
} else {
  debug(`Raven installed in ${NODE_ENV} environment`)
  Raven = require('raven')
  Raven.config(SENTRY_DSN_SERVER, options).install()
}

export default Raven

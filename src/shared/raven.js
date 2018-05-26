require('now-env')
const debug = require('debug')('shared:raven')

let Raven

const options = {
  autoBreadcrumbs: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV
}

if (
  process.env.NODE_ENV === 'production' &&
  !process.env.FORCE_DEV &&
  process.env.SENTRY_DSN_SERVER
) {
  debug(`Raven installed in ${process.env.NODE_ENV} environment`)
  Raven = require('raven')
  Raven.config(process.env.SENTRY_DSN_SERVER, options).install()
} else {
  debug(`Raven installed in ${process.env.NODE_ENV} environment`)
  Raven = require('raven')
  Raven.config(process.env.SENTRY_DSN_SERVER, options).install()
}

export default Raven

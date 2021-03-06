require('dotenv').config()

const {
  NODE_ENV,
  PORT,
  STATSD_HOST,
  STATSD_PORT,
  SENTRY_DSN_SERVER,
  GITHUB_CLIENT_ID_DEV,
  GITHUB_CLIENT_SECRET_DEV,
  SESSION_SECRET,
  SPARKPOST_API_KEY,
  REDISLABS_PW,
  REDISLABS_URI,
  ENGINE_API_KEY,
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  PRISMA_MANAGEMENT_API_SECRET,
  APP_SECRET,
  MAILSLURP_KEY
} = process.env

const config = {
  NODE_ENV: NODE_ENV || 'development',
  PORT: Number(PORT) || 3000,
  STATSD_HOST: STATSD_HOST || 'localhost',
  STATSD_PORT: Number(STATSD_PORT) || 8125,
  SENTRY_DSN_SERVER,
  GITHUB_CLIENT_ID_DEV,
  GITHUB_CLIENT_SECRET_DEV,
  SESSION_SECRET,
  SPARKPOST_API_KEY,
  REDISLABS_PW,
  REDISLABS_URI,
  ENGINE_API_KEY,
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  PRISMA_MANAGEMENT_API_SECRET,
  APP_SECRET,
  MAILSLURP_KEY
}

export default config

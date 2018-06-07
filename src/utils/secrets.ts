// const debug = require('debug')('utils:secrets')
// import dotenv from 'dotenv'
// import * as fs from 'fs'

// if (fs.existsSync('.env')) {
//   debug('Using .env file to supply config environment variables')
//   dotenv.config({ path: '.env' })
// } else {
//   debug('Using .env.example file to supply config environment variables')
//   dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
// }
// export const ENVIRONMENT = process.env.NODE_ENV
// const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'
// export const SESSION_SECRET = process.env.SESSION_SECRET
// export const MONGODB_URI = prod
//   ? process.env.MONGODB_URI
//   : process.env.MONGODB_URI_LOCAL

// if (!SESSION_SECRET) {
//   debug('No client secret. Set SESSION_SECRET environment variable.')
//   process.exit(1)
// }

// if (!MONGODB_URI) {
//   debug('No mongo connection string. Set MONGODB_URI environment variable.')
//   process.exit(1)
// }

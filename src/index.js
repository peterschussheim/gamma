/* @flow */
require('dotenv').config()

import startServer from './server'

const notTest = process.env.NODE_ENV !== 'test'
const isProduction = process.env.NODE_ENV !== 'production'

startServer()

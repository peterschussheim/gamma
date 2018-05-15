require('babel-register')

const parse = require('pg-connection-string').parse

const { RDS_POSTGRES_URI } = process.env

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    useNullAsDefault: true
  },
  production: RDS_POSTGRES_URI && {
    client: 'pg',
    connection: Object.assign({}, parse(RDS_POSTGRES_URI), { ssl: true })
  }
}

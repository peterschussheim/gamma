const bootup = Date.now()
const os = require('os')
const ms = require('ms')
const debug = require('debug')('web:middlewares:stats')
const { inspect } = require('util')
// const rawBody = require('raw-body')

const env = {}
// filter env variables we aren't interested in
for (const key of Object.keys(process.env).sort()) {
  if (key === 'AUTH_TOKEN') continue
  if (key.startsWith('npm_')) continue
  env[key] = process.env[key]
}

module.exports = async function(req, res, next) {
  const now = Date.now()
  const uptime = now - bootup
  const data = {
    now,
    bootup,
    bootupHuman: new Date(bootup).toUTCString(),
    uptime,
    uptimeHuman: ms(uptime),
    request: {
      url: req.url,
      method: req.method,
      headers: req.headers
      // body: String(await rawBody(req))
    },
    process: {
      pid: process.pid,
      ppid: process.ppid,
      versions: process.versions,
      env
    },
    os: {
      hostname: os.hostname(),
      arch: os.arch(),
      platform: os.platform(),
      homedir: os.homedir(),
      cpus: os.cpus(),
      userInfo: os.userInfo()
    }
  }
  debug(`Stats: ${inspect(data, { colors: true, depth: 5 })}`)
  next()
}

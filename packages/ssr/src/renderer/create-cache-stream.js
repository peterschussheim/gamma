const debug = require('debug')('renderer:create-cache-stream')
import { Transform } from 'stream'
import redis from './redis'

const createCacheStream = key => {
  debug('create cache stream for', key)
  const buffer = []
  return new Transform({
    transform(data, enc, cb) {
      buffer.push(data)
      cb(null, data)
    },
    flush(cb) {
      if (!process.env.DISABLE_CACHE) {
        debug('stream ended, caching result to redis')
        redis.set(key, Buffer.concat(buffer), 'ex', 3600)
      }
      cb()
    }
  })
}

export default createCacheStream

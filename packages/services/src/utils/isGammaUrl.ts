import { URL } from 'url'
import { RELATIVE_URL } from './regexps'

const IS_PROD = !process.env.FORCE_DEV && process.env.NODE_ENV === 'production'

/**
 * Verify a given URL string is a a gamma.app URL
 */
export default url => {
  if (RELATIVE_URL.test(url)) return true

  try {
    const { hostname, protocol } = new URL(url)

    const IS_GAMMA_URL = hostname.endsWith('gamma.app')
    const IS_LOCALHOST = hostname === 'localhost'
    const IS_HTTP = protocol === 'https:' || protocol === 'http:'

    if (IS_HTTP && (IS_GAMMA_URL || (!IS_PROD && IS_LOCALHOST))) {
      return true
    }
  } catch (err) {
    console.error(`Invalid URL ("${url}") passed. Error stack:`)
    console.error(err)
  }
  return false
}

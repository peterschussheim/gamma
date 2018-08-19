import rp from 'request-promise'
import DataLoader from 'dataloader'

// Keys are GitHub API URLs, values are { etag, result } objects
const eTagCache = {}

const GITHUB_API_ROOT = 'https://api.github.com'

// interface Connector<A, B, C> {
//   property: A;
//   fetch(val: B): C;
//   get(val: B): C;
// }

export class GitHubConnector {
  clientId: *
  clientSecret: *
  rp: *
  loader: *
  mockRequestPromise: *
  constructor({ clientId, clientSecret } = {}) {
    this.clientId = clientId
    this.clientSecret = clientSecret

    // Allow mocking request promise for tests
    this.rp = rp
    if (GitHubConnector.mockRequestPromise) {
      this.rp = GitHubConnector.mockRequestPromise
    }

    this.loader = new DataLoader(this.fetch.bind(this), {
      batch: false
    })
  }
  fetch(urls: Array<string>) {
    const options = {
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'user-agent': 'gamma.app'
      }
    }

    if (this.clientId) {
      options.qs = {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }
    }

    return Promise.all(
      urls.map(url => {
        const cachedRes = eTagCache[url]

        if (cachedRes && cachedRes.eTag) {
          options.headers['If-None-Match'] = cachedRes.eTag
        }
        return new Promise(resolve => {
          this.rp({
            uri: url,
            ...options
          })
            .then(response => {
              const { body } = response
              eTagCache[url] = {
                result: body,
                eTag: response.headers.etag
              }
              resolve(body)
            })
            .catch(err => {
              if (err.statusCode === 304) {
                resolve(cachedRes.result)
              } else {
                // hook up sentry here to handle errors
                resolve(null)
              }
            })
        })
      })
    )
  }

  get(path) {
    return this.loader.load(GITHUB_API_ROOT + path)
  }
}

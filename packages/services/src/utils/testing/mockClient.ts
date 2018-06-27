import * as rp from 'request-promise'

export class MockClient {
  url: string
  options: {
    jar: any
    withCredentials: boolean
    json: boolean
  }
  constructor(url: string) {
    this.url = url
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true
    }
  }

  async signup(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          signup(email: "${email}", password: "${password}") {
            user {
              id
            }
            token
          }
        }
        `
      }
    })
  }

  async login(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            user {
              id
            }
            token
          }
        }
        `
      }
    })
  }

  async viewer() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        {
          viewer {
            me {
              id
              posts {
                id
                visibility
                content {
                  id
                  data
                }
                tags {
                  id
                  text
                }
              }
            }
          }
        }
        `
      }
    })
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          logout {
            success
          }
        }
        `
      }
    })
  }

  // async forgotPasswordChange(newPassword: string, key: string) {
  //   return rp.post(this.url, {
  //     ...this.options,
  //     body: {
  //       query: `
  //         mutation {
  //           forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
  //             path
  //             message
  //           }
  //         }
  //       `
  //     }
  //   })
  // }
}

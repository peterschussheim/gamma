const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    // req.user on backend will contain user info if
    // this person has credentials that are valid
    fetch('/user', {
      credentials: 'include'
    })
      .then(res => {
        this.isAuthenticated = true
        if (typeof cb === 'function') {
          cb(res.json().user)
        }
      })
      .catch(err => {
        console.log('Error fetching authorized user.')
      })
  },
  logout(cb) {
    fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        this.isAuthenticated = false
        if (typeof cb === 'function') {
          // user was logged out
          cb(true)
        }
      })
      .catch(err => {
        console.log('Error logging out user.')
        if (typeof cb === 'function') {
          // user was not logged out
          cb(false)
        }
      })
  }
}

export default auth

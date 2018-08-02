import { omit } from 'lodash'

function userToJSON(user) {
  return omit(user, ['exp', 'iat', 'hash', 'salt'])
}

function getLocalStrategy() {
  return new LocalStrategy(async (username, password, done) => {
    let user
    try {
      user = (await db.getUsers(u => u.username === username))[0]
    } catch (error) {
      return done(error)
    }
    if (!user || !isPasswordValid(password, user)) {
      return done(null, false, {
        errors: { 'username or password': 'is invalid' }
      })
    }
    return done(null, userToJSON(user))
  })
}

export {
  authMiddleware,
  getSaltAndHash,
  userToJSON,
  getLocalStrategy,
  getUserToken,
  isPasswordAllowed
}

/* @flow */
import type {
  GetUserInput,
  SaveUserProviderInput,
  DBUser
} from '../../flowTypes'
import type { $QueryBuilder } from 'knex'

import knex from '../sql/connector'

const getUser = async (input: GetUserInput): Promise<?DBUser> => {
  if (input.id) {
    return await getUserById(input.id)
  }

  if (input.username) {
    return await getUserByUsername(input.username)
  }

  return null
}

const getUserById = (userId: string): Promise<DBUser> => {
  const query = knex('users').where({ userId })
  return query.then(([row]) => row)
}

const getUserByUsername = (username: string): Promise<DBUser> => {
  const query = knex('users').where({ username })
  return query.then(([row]) => row)
}

const getUserByEmail = (email: string): Promise<DBUser> => {
  const query = knex('users').where({ email })
  return query.then(([row]) => row)
}

const getUserByIndex = (indexName: string, indexValue: string) => {
  return knex('users')
    .where(indexValue, { index: indexName })
    .then(results => results && results.length > 0 && results[0])
}

const storeUser = (user: Object): Promise<DBUser> => {
  const query = knex('users').insert({
    ...user,
    modifiedAt: null
  })
  return query.then(([row]) => row)
}

const saveUserProvider = (
  userId: string,
  providerMethod: string,
  providerId: number,
  extraFields?: Object
) => {
  return knex('users')
    .where({ userId })
    .then(result => {
      let obj = Object.assign({}, result)
      obj[providerMethod] = providerId
      return obj
    })
    .then(user => {
      return knex('users')
        .where({ userId })
        .update({
          ...user,
          ...extraFields
        })
        .then(result => {
          const user = result.changes[0].new_val
          return user
        })
    })
}

/**
 * if a user id gets passed in, we know that a user most likely exists and we
 * just need to retrieve them from the db however, if a user id doesn't exist
 * we need to do a lookup by the email address passed in - if an email
 * address doesn't exist, we know that we're going to be creating a new user.
 */
const createOrFindUser = (
  user: Object,
  providerMethod: string
): Promise<DBUser | {}> => {
  let promise
  if (user.id) {
    promise = getUser({ id: user.id })
  } else {
    if (user[providerMethod]) {
      promise = getUserByIndex(providerMethod, user[providerMethod]).then(
        storedUser => {
          if (storedUser) {
            return storedUser
          }

          if (user.email) {
            return getUserByEmail(user.email)
          } else {
            return Promise.resolve({})
          }
        }
      )
    } else {
      if (user.email) {
        promise = getUserByEmail(user.email)
      } else {
        promise = Promise.resolve({})
      }
    }
  }

  return promise
    .then(storedUser => {
      // if a user is found with an id or email, return the user in the db
      if (storedUser && storedUser.id) {
        // if a user is signing in with a second auth method from what their
        // user was created with, store the new auth method
        if (!storedUser[providerMethod]) {
          return saveUserProvider(
            storedUser.id,
            providerMethod,
            user[providerMethod]
          ).then(() => Promise.resolve(storedUser))
        } else {
          return Promise.resolve(storedUser)
        }
      }

      // if no user exists, create a new one with the oauth profile data
      return storeUser(user)
    })
    .catch(err => {
      if (user.id) {
        console.error(err)
        return new Error(`No user found for id ${user.id}.`)
      }
      return storeUser(user)
    })
}

export { getUser, createOrFindUser, saveUserProvider, getUserByIndex }

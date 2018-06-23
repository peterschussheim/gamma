import { USER_SESSION_ID_PREFIX, REDIS_SESSION_PREFIX } from '../constants'
import { Redis } from 'ioredis'

/**
 * Deletes a SINGLE session for a given user.  Used to logout of a single session
 * (ex: user is signed in on 3 devices, logging out should only clear the session that the user
 * sent the logout mutation from.)
 *
 * @param sessionId {string}
 * @param redis {Redis}
 */
export const removeSingleSession = async (sessionID: string, redis: Redis) => {
  await redis.del(`${REDIS_SESSION_PREFIX}${sessionID}`)
}

/**
 * Deletes ALL sessions associated with a given user.  Used when a user requires
 * a PW reset or PW change.  Note that this will force the user to login again
 * on each device once they recover their PW.
 *
 * @param userId String
 * @param redis Redis
 */
export const removeAllUserSessions = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(
    `${USER_SESSION_ID_PREFIX}${userId}`,
    0,
    -1
  )

  await Promise.all(
    sessionIds.map(async id => {
      redis.del(`${REDIS_SESSION_PREFIX}${id}`)
    })
  )
}

// // refactor to use `p-queue`
// export const clearUserSessions = async (userId: string, redis: Redis) => {
//   // 1) find all sessions for this user
//   const { sessionIds } = redis.lrange(
//     `${USER_SESSION_ID_PREFIX}${userId}`,
//     0,
//     -1
//   )

//   // hold each `task`, to be Primise.all()
//   const promises = []

//   for (let i = 0; i < sessionIds; i += 1) {
//     // push each 'deletion task' that meets into an array
//     promises.push(redis.del(`${REDIS_SESSION_PREFIX}${sessionIds[i]}`))
//   }
//   await Promise.all(promises)
// }

const debug = require('debug')('utils:sessions')

import {
  USER_SESSION_ID_PREFIX,
  REDIS_SESSION_PREFIX,
  USER_SESSION_ID_PREFIX_TEST,
  REDIS_SESSION_PREFIX_TEST
} from '../constants'
import { Redis } from 'ioredis'

/**
 * if process.env=test use ****_TEST prefix
 * 
 *  need to figure out a mechanism to test this better, auth mutations
 *  should use redis test prefixes as well.
 *
/**


 /** 
 * Deletes a SINGLE session for a given user.  Used to logout of a single session
 * (ex: user is signed in on 3 devices, logging out should only clear the session that the user
 * sent the logout mutation from.)
 *
 * @param sessionId {string}
 * @param redis {Redis}
 */
export const removeSingleSession = async (
  sessionID: string,
  userId: string,
  redis: Redis
) => {
  // remove `sessionID` from sess keyspace
  await redis.del(`${REDIS_SESSION_PREFIX}${sessionID}`)

  // remove the same `sessionID` from this user's set of sessions
  await redis.srem(`${USER_SESSION_ID_PREFIX}${userId}`, sessionID)
}

/**
 * Deletes ALL sessions associated with a given user.  Used when a user requires
 * a PW reset or PW change.  Note that this will force the user to login again
 * on each device once they recover their PW.
 *
 * @param userId {string}
 * @param redis {Redis}
 */
export const removeAllUserSessions = async (userId: string, redis: Redis) => {
  // get a list of all sessionIDs for this userID
  const sessionIds = await redis.smembers(`${USER_SESSION_ID_PREFIX}${userId}`)

  // delete each sessionID for this user
  // `sess:9OSSlGnGCNFII7WhaI9tOwvvl1pf_gWn`
  await Promise.all(
    sessionIds.map(async id => {
      redis.del(`${REDIS_SESSION_PREFIX}${id}`)
    })
  )

  // delete the entire set of sessions for this user
  // `usid:cjinb8g7j9znj0886y207ieg4`
  await redis.del(`${USER_SESSION_ID_PREFIX}${userId}`)
}

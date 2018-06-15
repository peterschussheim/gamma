import { redisInstance } from '../redis'
import { userSessionIdPrefix, redisSessionPrefix } from '../constants'

export const removeAllUsersSessions = async (userId: string, redisInstance) => {
  const sessionIds = await redisInstance.lrange(
    `${userSessionIdPrefix}${userId}`,
    0,
    -1
  )

  const promises = []
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redisInstance.del(`${redisSessionPrefix}${sessionIds[i]}`))
  }
  await Promise.all(promises)
}

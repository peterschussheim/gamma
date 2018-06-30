import { v4 } from 'uuid'
import { Redis } from 'ioredis'

export const createConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const confirmationID = v4()
  await redis.set(confirmationID, userId, 'ex', 60 * 60 * 24)
  return `${url}/confirm/${confirmationID}`
}

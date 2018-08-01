import { v4 } from 'uuid'
import { Redis } from 'ioredis'
import { IS_PROD } from '../config'

export const createConfirmEmailLink = async (userId: string, redis: Redis) => {
  const url = IS_PROD
    ? 'https://api.gamma.app/confirm'
    : 'http://localhost:4000/api/confirm'
  const confirmationID = v4()
  await redis.set(confirmationID, userId, 'ex', 60 * 60 * 24)
  // TODO: add a redirect
  return `url/${confirmationID}`
}

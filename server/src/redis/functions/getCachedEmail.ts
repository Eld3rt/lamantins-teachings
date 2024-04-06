import { redis } from '../redis'
import { QueryConfirmAccountArgs, RequireFields } from '../../graphql/types/resolvers-types'

export const getCachedEmail = async (args: RequireFields<QueryConfirmAccountArgs, 'key'>) => {
  const { key } = args

  const redisResult = await redis.multi().hgetall(key).exec()

  if (!redisResult) {
    return null
  }

  if (redisResult[0][0]) {
    throw redisResult[0][0]
  }

  const result = redisResult[0][1] as { email: string }

  const cachedEmail = result.email

  if (!cachedEmail) {
    return null
  }

  await redis.del(key)

  return cachedEmail
}

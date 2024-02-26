import { redis } from '../redis/redis'
import { MutationCreateUserArgs, RequireFields } from '../graphql/types/resolvers-types'

export const getCachedUser = async (args: RequireFields<MutationCreateUserArgs, 'key'>) => {
  const { key } = args

  const redisResult = await redis.multi().hgetall(key).exec()

  if (!redisResult) {
    return null
  }

  if (redisResult[0][0]) {
    throw redisResult[0][0]
  }

  const cachedUser = redisResult[0][1] as {
    name: string
    email: string
    passhash: string
  }

  await redis.del(key)

  return cachedUser
}

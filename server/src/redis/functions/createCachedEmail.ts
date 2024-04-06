import { redis } from '../redis'

export const createCachedEmail = async (args: { email: string }, key: string) => {
  await redis
    .multi()
    .hmset(key, args)
    .expire(key, 60 * 60 * 24 * 7) // One week
    .exec()
}

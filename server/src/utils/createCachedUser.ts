import { hash } from 'bcrypt'
import { redis } from '../redis/redis'
import { MutationSignUpArgs, RequireFields } from '../graphql/types/resolvers-types'

export const createCachedUser = async (
  args: RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>,
  key: string
) => {
  const { name, email, password, path } = args

  const passhash = await hash(password, 7)

  const userObj = {
    name: name,
    email: email,
    passhash,
    path: path,
  }

  await redis
    .multi()
    .hmset(key, userObj)
    .expire(key, 60 * 60 * 24 * 7) // One week
    .exec()
}

import { hash } from 'bcrypt'
import { redis } from '../redis/redis'
import { MutationSignUpArgs, RequireFields } from '../graphql/types/resolvers-types'

export const createCachedUser = async (
  args: RequireFields<MutationSignUpArgs, 'email' | 'password' | 'name'>,
  key: string
) => {
  const { name, email, password } = args

  const passhash = await hash(password, 7)

  const userObj = {
    name: name,
    email: email,
    passhash,
  }

  await redis
    .multi()
    .hmset(key, userObj)
    .expire(key, 60 * 2)
    .exec()
}

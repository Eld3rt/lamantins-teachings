import { PrismaClient, User } from '@prisma/client'
import { MutationSignInArgs, RequireFields } from '../graphql/types/resolvers-types'
import { compare } from 'bcrypt'

export const getExistingUser = async (
  args: RequireFields<MutationSignInArgs, 'email' | 'password'>,
  prisma: PrismaClient
): Promise<User> => {
  const { email, password } = args
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })
  const passwordMatch = await compare(password, (existingUser?.passhash as string) || '')
  if (!existingUser || !passwordMatch) {
    throw new Error('Incorrect email or password')
  }
  return existingUser
}

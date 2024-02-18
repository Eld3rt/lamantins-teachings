import { PrismaClient, User } from '@prisma/client'
import { MutationSignUpArgs, RequireFields } from '../graphql/types/resolvers-types'
import { hash } from 'bcrypt'

export const createUser = async (
  args: RequireFields<MutationSignUpArgs, 'name' | 'email' | 'password'>,
  prisma: PrismaClient
): Promise<User> => {
  const { name, email, password } = args
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })
  if (existingUser) {
    throw new Error('Email already taken')
  }

  const passhash = await hash(password, 7)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passhash,
    },
  })

  return user
}

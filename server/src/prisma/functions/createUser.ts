import { PrismaClient, User } from '@prisma/client'

export const createUser = async (
  cachedUser: {
    name?: string
    email: string
    passhash: string
  },
  prisma: PrismaClient
): Promise<User> => {
  const { name, email, passhash } = cachedUser

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passhash,
    },
  })

  return user
}

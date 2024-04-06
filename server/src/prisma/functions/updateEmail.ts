import { PrismaClient, User } from '@prisma/client'

export const updateEmail = async (cachedEmail: string, currentUser: User, prisma: PrismaClient): Promise<User> => {
  const { id } = currentUser

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: cachedEmail,
    },
  })

  return user
}

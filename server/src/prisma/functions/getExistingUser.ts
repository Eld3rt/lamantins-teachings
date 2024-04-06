import { PrismaClient, User } from '@prisma/client'

export const getExistingUser = async (args: { email: string }, prisma: PrismaClient): Promise<User | null> => {
  const { email } = args
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })

  return existingUser
}

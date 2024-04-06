import { PrismaClient, User } from '@prisma/client'

export const updateEmail = async (updateObj: { email: string; id: number }, prisma: PrismaClient): Promise<User> => {
  const { email, id } = updateObj
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
    },
  })

  return user
}

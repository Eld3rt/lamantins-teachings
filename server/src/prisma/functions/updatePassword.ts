import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { prisma } from '../prisma'

export const updatePassword = async (newPassword: string, currentUser: User): Promise<User> => {
  const { id } = currentUser

  const newPasshash = await hash(newPassword, 7)

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      passhash: newPasshash,
    },
  })

  return user
}

import { PrismaClient, User } from '@prisma/client'
import { MutationSignInArgs, RequireFields } from '../graphql/types/resolvers-types'

export const getExistingUser = async (
  args: RequireFields<MutationSignInArgs, 'email'>,
  prisma: PrismaClient
): Promise<User | null> => {
  const { email } = args
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })

  return existingUser
}

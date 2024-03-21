import { PrismaClient, User, Course } from '@prisma/client'
import { MutationPurchaseCourseArgs, RequireFields } from '../graphql/types/resolvers-types'

export const getPurchasedCourse = async (
  args: RequireFields<MutationPurchaseCourseArgs, 'courseId'>,
  currentUser: User,
  prisma: PrismaClient
): Promise<Course | null> => {
  const { courseId } = args
  const userId = currentUser.id
  const existingPurchasedCourse = await prisma.course.findFirst({
    where: {
      id: courseId,
      users: {
        some: {
          id: userId,
        },
      },
    },
  })

  return existingPurchasedCourse
}

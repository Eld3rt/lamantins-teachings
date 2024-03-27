import { PrismaClient, User, Course } from '@prisma/client'

export const getPurchasedCourses = async (currentUser: User, prisma: PrismaClient): Promise<Course[] | null> => {
  const userId = currentUser.id
  const purchasedCourses = await prisma.course.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  })

  return purchasedCourses
}

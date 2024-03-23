import { PrismaClient, Course } from '@prisma/client'

export const getCourses = async (prisma: PrismaClient): Promise<Course[]> => {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return courses
}

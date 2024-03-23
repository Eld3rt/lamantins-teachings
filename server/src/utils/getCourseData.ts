import { PrismaClient, Course } from '@prisma/client'
import { QueryGetCourseDataArgs, RequireFields } from '../graphql/types/resolvers-types'

export const getCourseData = async (
  args: RequireFields<QueryGetCourseDataArgs, 'slug'>,
  prisma: PrismaClient
): Promise<Course | null> => {
  const { slug } = args

  const course = await prisma.course.findFirst({
    where: {
      slug: slug,
    },
    include: {
      lessons: true,
    },
  })

  return course
}

import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types'
import { getPurchasedCourse } from '../../../prisma/functions/getPurchasedCourse'
import { purchaseCourse } from '../../../prisma/functions/purchaseCourse'
import { getCourses } from '../../../prisma/functions/getCourses'
import { getCourseData } from '../../../prisma/functions/getCourseData'
import { getPurchasedCourses } from '../../../prisma/functions/getPurchasedCourses'

export const typeDefs = gql`
  extend type Query {
    getCourses: [Course!]!
    getPurchasedCourses: [Course!]
    getCourseData(slug: String!): Course
    getLesson(id: Int!): Lesson
  }

  extend type Mutation {
    purchaseCourse(courseId: Int!): PurchaseCourseResponse
  }

  type PurchaseCourseResponse {
    purchasedCourse: Course!
  }

  type Course {
    id: Int!
    name: String!
    slug: String
    lessons: [Lesson!]
  }

  type Lesson {
    id: Int!
    name: String!
  }
`

export const resolvers: Resolvers = {
  Query: {
    getCourses: async (_, __, context) => {
      const { prisma } = context

      const courses = await getCourses(prisma)

      return courses
    },
    getCourseData: async (_, args, context) => {
      const { prisma } = context

      const course = await getCourseData(args, prisma)

      return course
    },
    getPurchasedCourses: async (_, __, context) => {
      const { currentUser, prisma } = context

      if (!currentUser) return null

      const purchasedCourses = await getPurchasedCourses(currentUser, prisma)

      return purchasedCourses
    },
  },
  Mutation: {
    purchaseCourse: async (_, args, context) => {
      const { currentUser, prisma } = context

      if (!currentUser) return null

      const existingPurchasedCourse = await getPurchasedCourse(args, currentUser, prisma)
      if (existingPurchasedCourse) throw new Error('User has already successfully purchased the course.')

      const purchasedCourse = await purchaseCourse(args, currentUser, prisma)
      return { purchasedCourse }
    },
  },
}

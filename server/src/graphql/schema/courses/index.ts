import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types'
import { getPurchasedCourse } from '../../../utils/getPurchasedCourse'
import { purchaseCourse } from '../../../utils/purchaseCourse'
import { GraphQLError } from 'graphql'

export const typeDefs = gql`
  extend type Query {
    getPurchasedCourses: [Course!]
    getCourseData(courseId: Int!): Course
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
    lessons: [Lesson!]!
  }

  type Lesson {
    id: Int!
    name: String!
  }
`

export const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    purchaseCourse: async (_, args, context) => {
      try {
        const { currentUser, prisma } = context

        if (!currentUser) throw new Error('User is not logged in')

        const existingPurchasedCourse = await getPurchasedCourse(args, currentUser, prisma)
        if (existingPurchasedCourse) throw new Error('User has already successfully purchased the course.')

        const purchasedCourse = await purchaseCourse(args, currentUser, prisma)
        return { purchasedCourse }
      } catch (error) {
        console.log('purchasingCourse error', error)
        throw new GraphQLError('Error purchase course')
      }
    },
  },
}

import { GraphQLError } from 'graphql'
import { Resolvers } from './resolvers-types.js'

export const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, args, context) => {
      const { username: searchedUsername } = args
      const { prisma } = context
      try {
        const users = await prisma.user.findMany({
          where: { username: searchedUsername },
        })
        return users
      } catch (error: any) {
        console.log('error', error)
        throw new GraphQLError(error?.message)
      }
    },
  },
  Mutation: {
    createUser: async (_, args, context) => {
      const {
        input: { username, email },
      } = args
      const { prisma } = context
      try {
        const user = await prisma.user.create({
          data: {
            username,
            email,
          },
        })
        return { code: '200', success: true, message: 'User created successfully', user }
      } catch (error) {
        console.log('createUser error', error)
        throw new GraphQLError('Error creating User')
      }
    },
  },
  // Subscription: {},
}

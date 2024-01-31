import { GraphQLError } from 'graphql'
import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types.js'
import { authValidation } from '../../../utils/authValidation.js'
import { hash } from 'bcrypt'

export const typeDefs = gql`
  extend type Query {
    searchUsers(name: String!): [User]
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): signUpResponse
  }

  type signUpResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type User {
    id: ID
    name: String
    email: String
  }
`

export const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, args, context) => {
      const { name: searchedName } = args
      const { prisma } = context
      try {
        const users = await prisma.user.findMany({
          where: { name: searchedName },
        })
        return users
      } catch (error: any) {
        console.log('error', error)
        throw new GraphQLError(error?.message)
      }
    },
  },
  Mutation: {
    signUp: async (_, args, context) => {
      const { name, email, password } = args
      const { prisma } = context

      await authValidation.validate(args)

      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
      if (existingUser) {
        throw new Error('Email already taken')
      }

      const passhash = await hash(password, 7)

      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            passhash,
          },
        })
        return { code: '200', success: true, message: 'User created successfully', user }
      } catch (error) {
        console.log('signUp error', error)
        throw new GraphQLError('Error creating User')
      }
    },
  },
}

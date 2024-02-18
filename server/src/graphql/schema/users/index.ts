import { GraphQLError } from 'graphql'
import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types.js'
import { authValidation } from '../../../utils/authValidation.js'
import { createUser } from '../../../utils/createUser.js'
import { getExistingUser } from '../../../utils/getExistingUser.js'
import jsonwebtoken from 'jsonwebtoken'
export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): signUpResponse
    signIn(email: String!, password: String!): signInResponse
  }

  type signUpResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type signInResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    existingUser: User
  }

  type User {
    id: Int!
    name: String!
    email: String!
  }
`

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, context) => {
      const { currentUser } = context
      return currentUser || null
    },
  },
  Mutation: {
    signUp: async (_, args, context) => {
      try {
        const { name, email, password } = args
        const { prisma, res } = context

        await authValidation.validate(args)

        const user = await createUser({ name, email, password }, prisma)

        const secret = process.env.JWT_SECRET || 'lt.secret'
        const authToken = jsonwebtoken.sign(email, secret)
        res.cookie('sid', authToken, { maxAge: 60 * 60 * 24 * 7 * 1000 })

        return { code: '200', success: true, message: 'User created successfully', user }
      } catch (error) {
        console.log('signUp error', error)
        throw new GraphQLError('Error creating User')
      }
    },
    signIn: async (_, args, context) => {
      try {
        const { email, password } = args
        const { prisma, res } = context

        await authValidation.validate(args)

        const secret = process.env.JWT_SECRET || 'lt.secret'
        const authToken = jsonwebtoken.sign(email, secret)
        res.cookie('sid', authToken, { maxAge: 60 * 60 * 24 * 7 * 1000 })

        const existingUser = await getExistingUser({ email, password }, prisma)

        return { code: '200', success: true, message: 'Signed in successfully', existingUser }
      } catch (error) {
        console.log('signIn error', error)
        throw new GraphQLError('Error sign in')
      }
    },
  },
}

import { GraphQLError } from 'graphql'
import gql from 'graphql-tag'
import jsonwebtoken from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import { compare } from 'bcrypt'
import { Resolvers } from '../../types/resolvers-types.js'
import { authValidation } from '../../../utils/authValidation.js'
import { createCachedUser } from '../../../utils/createCachedUser.js'
import { createUser } from '../../../utils/createUser.js'
import { getCachedUser } from '../../../utils/getCachedUser.js'
import { getExistingUser } from '../../../utils/getExistingUser.js'
import { getTransport } from '../../../nodemailer/transport.js'
import { generateVerificationEmail } from '../../../nodemailer/verifyAccount.js'
export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): signUpResponse
    createUser(key: String!): createUserResponse
    signIn(email: String!, password: String!): signInResponse
  }

  type signUpResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type createUserResponse implements MutationResponse {
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
        const { name, email } = args

        const { prisma } = context

        await authValidation.validate(args)

        const existingUser = await getExistingUser(args, prisma)
        if (existingUser !== null) {
          throw new Error('Email or username already taken!')
        }

        const key = uuidv4()

        await createCachedUser(args, key)

        const transport = await getTransport()
        const mailOptions = generateVerificationEmail({
          name: name,
          email: email,
          uuid: key,
        })
        transport.sendMail(mailOptions).then(info => {
          console.log(`Message id: ${info.messageId}`)
          console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
        })

        return {
          code: '200',
          success: true,
          message: 'Thanks for registering! Check your email for instructions on how to verify your account.',
        }
      } catch (error) {
        console.log('signUp error', error)
        throw new GraphQLError('Sign up error')
      }
    },
    createUser: async (_, args, context) => {
      try {
        const { res, prisma } = context

        const cachedUser = await getCachedUser(args)

        if (!cachedUser) {
          throw new Error('Error getting cached user')
        }

        const user = await createUser(cachedUser, prisma)

        const secret = process.env.JWT_SECRET || 'lt.secret'
        const authToken = jsonwebtoken.sign(user.email, secret)
        res.cookie('sid', authToken, { maxAge: 60 * 60 * 24 * 7 * 1000 })

        return { code: '200', success: true, message: 'User created successfully', user }
      } catch (error) {
        console.log('signIn error', error)
        throw new GraphQLError('Error creating user')
      }
    },
    signIn: async (_, args, context) => {
      try {
        const { email, password } = args
        const { res, prisma } = context

        await authValidation.validate(args)

        const secret = process.env.JWT_SECRET || 'lt.secret'
        const authToken = jsonwebtoken.sign(email, secret)
        res.cookie('sid', authToken, { maxAge: 60 * 60 * 24 * 7 * 1000 })

        const existingUser = await getExistingUser(args, prisma)

        const passwordMatch = await compare(password, (existingUser?.passhash as string) || '')

        if (!existingUser || !passwordMatch) {
          throw new Error('Incorrect email or password')
        }

        return { code: '200', success: true, message: 'Signed in successfully', existingUser }
      } catch (error) {
        console.log('signIn error', error)
        throw new GraphQLError('Error sign in')
      }
    },
  },
}

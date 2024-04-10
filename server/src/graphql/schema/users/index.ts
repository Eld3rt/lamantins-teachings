import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import { compare } from 'bcrypt'
import * as Yup from 'yup'
import { Resolvers } from '../../types/resolvers-types.js'
import { authValidation } from '../../../utils/authValidation.js'
import { createCachedUser } from '../../../redis/functions/createCachedUser.js'
import { createUser } from '../../../prisma/functions/createUser.js'
import { getCachedUser } from '../../../redis/functions/getCachedUser.js'
import { getExistingUser } from '../../../prisma/functions/getExistingUser.js'
import { getTransport } from '../../../nodemailer/transport.js'
import { verifyAccount } from '../../../nodemailer/verifyAccount.js'
import { updateUserName } from '../../../prisma/functions/updateUserName.js'
import { verifyEmail } from '../../../nodemailer/verifyEmail.js'
import { updateEmail } from '../../../prisma/functions/updateEmail.js'
import { createCachedEmail } from '../../../redis/functions/createCachedEmail.js'
import { getCachedEmail } from '../../../redis/functions/getCachedEmail.js'
import { createCachedSession } from '../../../redis/functions/createCachedSession.js'
import { deleteCachedSession } from '../../../redis/functions/deleteCachedSession.js'
const crypto = await import('node:crypto')

export const typeDefs = gql`
  extend type Query {
    me: User
    confirmAccount(key: String!): ConfirmAccountResponse
    confirmEmail(key: String!): ConfirmEmailResponse
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!, path: String): SignUpResponse
    signIn(email: String!, password: String!): SignInResponse
    signOut: SignOutResponse
    updateUserName(newName: String!): UpdateUserNameResponse
    updateEmail(email: String!): UpdateEmailResponse
  }

  type User {
    id: Int!
    name: String
    email: String!
  }

  type SignUpResponse {
    message: String!
  }

  type ConfirmAccountResponse {
    user: User
    path: String
  }

  type SignInResponse {
    existingUser: User
  }

  type SignOutResponse {
    message: String!
  }

  type UpdateUserNameResponse {
    message: String!
  }

  type UpdateEmailResponse {
    message: String!
  }

  type ConfirmEmailResponse {
    user: User
    message: String!
  }
`

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, context) => {
      const { currentUser } = context
      return currentUser || null
    },
    confirmAccount: async (_, args, __) => {
      const cachedUser = await getCachedUser(args)

      if (!cachedUser) {
        throw new Error('Error getting cached user')
      }

      const user = await createUser(cachedUser)

      const path = cachedUser.path

      return { user, path }
    },
    confirmEmail: async (_, args, __) => {
      const updateObj = await getCachedEmail(args)

      if (!updateObj) {
        throw new Error('Error getting cached user')
      }

      const user = await updateEmail(updateObj)

      return { user, message: 'Email successfully updated!' }
    },
  },
  Mutation: {
    signUp: async (_, args, __) => {
      const { name, email } = args

      await authValidation.validate(args)

      const existingUser = await getExistingUser(args)
      if (existingUser !== null) {
        throw new Error('Email already taken!')
      }

      const key = uuidv4()

      await createCachedUser(args, key)

      const transport = await getTransport()
      const mailOptions = verifyAccount({
        name: name,
        email: email,
        uuid: key,
      })
      transport.sendMail(mailOptions).then(info => {
        console.log(`Message id: ${info.messageId}`)
        console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
      })

      return {
        message: 'Thanks for registering! Check your email for instructions on how to verify your account.',
      }
    },
    signIn: async (_, args, context) => {
      const { password } = args
      const { res } = context

      await authValidation.validate(args)

      const existingUser = await getExistingUser(args)

      const passwordMatch = await compare(password, (existingUser?.passhash as string) || '')

      if (!existingUser || !passwordMatch) {
        throw new Error('Incorrect email or password')
      }

      const sessionToken = crypto.randomBytes(32).toString('base64')

      const userId = existingUser.id

      await createCachedSession(userId, sessionToken)

      res.cookie('sid', sessionToken, {
        maxAge: 60 * 60 * 24 * 7 * 1000, // One week
      })

      return { existingUser }
    },
    signOut: async (_, __, context) => {
      const { currentUser, authToken } = context

      if (!currentUser) {
        return null
      }

      const { id } = currentUser

      await deleteCachedSession(id, authToken)

      return { message: 'Success sign out.' }
    },
    updateUserName: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      Yup.object({
        name: Yup.string().max(200, 'Name too long'),
      }).validate(args)

      await updateUserName(args, currentUser)

      return { message: 'Saved!' }
    },
    updateEmail: async (_, args, context) => {
      const { email } = args
      const { currentUser } = context

      if (!currentUser) return null

      Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email').max(200, 'Email too long'),
      }).validate(args)

      const existingUser = await getExistingUser(args)

      if (existingUser !== null) {
        throw new Error('Email already taken!')
      }

      const key = uuidv4()

      const userId = currentUser.id

      await createCachedEmail(args, key, userId)

      const transport = await getTransport()
      const mailOptions = verifyEmail({
        name: currentUser.name,
        email: email,
        uuid: key,
      })
      transport.sendMail(mailOptions).then(info => {
        console.log(`Message id: ${info.messageId}`)
        console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
      })

      return {
        message: `Check your email (${email}) for instructions on how to change your current email.`,
      }
    },
  },
}

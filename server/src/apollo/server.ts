import { ApolloServer } from '@apollo/server'
import { PrismaClient, User } from '@prisma/client'
import { Redis } from 'ioredis'
import { Response } from 'express'
import { typeDefs, resolvers } from '../graphql/schema/index'

export interface MyContext {
  prisma: PrismaClient
  redis: Redis
  res: Response
  authToken: string
  currentUser: User | null
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

export { server }

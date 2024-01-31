import { ApolloServer } from '@apollo/server'
import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import { ServerResponse } from 'http'
import { typeDefs, resolvers } from '../graphql/schema/index'

export interface MyContext {
  prisma: PrismaClient
  res: Response | ServerResponse
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

export { server }

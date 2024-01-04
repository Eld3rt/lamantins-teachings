import express, { json } from 'express'
import cors from 'cors'
// import gql from 'graphql-tag'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { resolvers } from './src/resolvers.js'
import { readFileSync } from 'fs'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: process.env.BASE_URL,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

const typeDefs = readFileSync('./src/schema.graphql', 'utf8')

export interface MyContext {
  prisma: PrismaClient
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

await server.start()

app.use(
  '/graphql',
  cors(corsOptions),
  json(),
  expressMiddleware(server, {
    context: async () => {
      const prisma = new PrismaClient()
      return {
        prisma,
      }
    },
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

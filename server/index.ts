import express, { json } from 'express'
import cors from 'cors'
import { server } from './src/apollo/server'
import { prisma } from './src/prisma/prisma'
import { expressMiddleware } from '@apollo/server/express4'
import jsonwebtoken from 'jsonwebtoken'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: process.env.BASE_URL,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

await server.start()

app.use(
  '/graphql',
  cors(corsOptions),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const authToken = req.headers.cookie || ''

      const secret = process.env.JWT_SECRET || 'lt.secret'
      let currentUser = null
      if (authToken) {
        const email = jsonwebtoken.verify(authToken, secret) as string
        currentUser = await prisma.user.findFirst({
          where: { email: email },
        })
      }

      return { currentUser, res, prisma }
    },
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

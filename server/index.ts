import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { server } from './src/apollo/server'
import { prisma } from './src/prisma/prisma'
import { expressMiddleware } from '@apollo/server/express4'
import { getCachedSession } from './src/redis/functions/getCachedSession'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: process.env.BASE_URL,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

await server.start()

app.use(
  '/graphql',
  cors(corsOptions),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const authToken: string = req.cookies.sid || ''

      console.log(authToken)

      let currentUser = null
      if (authToken) {
        const userId = await getCachedSession(authToken)

        if (userId) {
          console.log(userId)
          currentUser = await prisma.user.findFirst({
            where: { id: userId },
          })
        }

        console.log(currentUser)
      }
      return { currentUser, res, prisma }
    },
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

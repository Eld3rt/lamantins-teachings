import gql from 'graphql-tag'
import { server } from '../../src/apollo/server'

type SingleGraphQLResponse<ResponseData> = {
  body: {
    kind: 'single'
    singleResult: {
      data: ResponseData
    }
  }
}

type ResponseData = {
  username: string
  email: string
}

it('should create a new user', async () => {
  let result = (await server.executeOperation<ResponseData>({
    query: gql`
      mutation {
        createUser(username: "test", email: "test@test.com") {
          user {
            id
            username
            email
          }
        }
      }
    `,
  })) as SingleGraphQLResponse<ResponseData>
  console.log(result.body.singleResult)
  expect(result.body.singleResult.data).toBeDefined()
  expect(result.body.singleResult.data).toMatchSnapshot()
})

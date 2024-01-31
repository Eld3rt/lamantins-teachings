import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query
  type Mutation
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`

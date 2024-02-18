import { gql } from '@apollo/client'

export default gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      code
      success
      message
      existingUser {
        id
        name
        email
      }
    }
  }
`

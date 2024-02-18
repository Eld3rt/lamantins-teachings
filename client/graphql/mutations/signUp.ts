import { gql } from '@apollo/client'

export default gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      code
      success
      message
      user {
        id
        name
        email
      }
    }
  }
`

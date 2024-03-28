import { gql } from '@apollo/client'

export default gql`
  query confirmAccount($key: String!) {
    confirmAccount(key: $key) {
      user {
        email
      }
      path
    }
  }
`

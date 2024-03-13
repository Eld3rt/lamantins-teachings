import { gql } from '@apollo/client'

export default gql`
  fragment MutationResponse on MutationResponse {
    code
    success
    message
  }
`

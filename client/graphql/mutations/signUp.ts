import { gql } from '@apollo/client'
import mutationResponse from '../fragments/mutationResponse'

export default gql`
  mutation signUp($name: String!, $email: String!, $password: String!, $path: String!) {
    signUp(name: $name, email: $email, password: $password, path: $path) {
      ...MutationResponse
    }
		${mutationResponse}
  }
`

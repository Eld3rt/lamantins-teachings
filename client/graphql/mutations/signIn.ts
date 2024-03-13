import { gql } from '@apollo/client'
import user from '../fragments/user'
import mutationResponse from '../fragments/mutationResponse'

export default gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ...MutationResponse
      existingUser{
				...User
			}
    }
		${user}
		${mutationResponse}
  }
`

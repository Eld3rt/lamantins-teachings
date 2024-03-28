import { gql } from '@apollo/client'
import user from '../fragments/user'

export default gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
			existingUser{
				email
			}
    }
		${user}
  }
`

import { gql } from '@apollo/client'
import user from '../fragments/user'

export default gql`
	query confirmAccount($key: String!) {
		confirmAccount(key: $key) {
			user {
				...User
			}
			path
		}
		${user}
	}`

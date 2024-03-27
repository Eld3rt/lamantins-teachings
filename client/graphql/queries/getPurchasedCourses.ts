import { gql } from '@apollo/client'
import course from '../fragments/course'

export default gql`
  query GetPurchasedCourses {
    getPurchasedCourses {
      ...Course
    }
		${course}
  }
`

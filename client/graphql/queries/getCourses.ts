import { gql } from '@apollo/client'
import course from '../fragments/course'

export default gql`
  query GetCourses {
    getCourses {
      ...Course
    }
		${course}
  }
`

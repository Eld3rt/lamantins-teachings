import { gql } from '@apollo/client'
import course from '../fragments/course'

export default gql`
  mutation PurchaseCourse($courseId: Int!) {
    purchaseCourse(courseId: $courseId) {
      purchasedCourse {
        ...Course
      }
    }
		${course}
  }
`

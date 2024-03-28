import { gql } from '@apollo/client'
import courseInfo from '../fragments/courseInfo'

export default gql`
  mutation PurchaseCourse($courseId: Int!) {
    purchaseCourse(courseId: $courseId) {
      purchasedCourse {
        ...CourseInfo
      }
    }
		${courseInfo}
  }
`

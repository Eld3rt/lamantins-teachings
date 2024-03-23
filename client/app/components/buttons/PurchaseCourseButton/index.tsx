'use client'

import { usePurchaseCourseMutation } from '@/graphql/generated'
import { ApolloError } from '@apollo/client'
import { useState } from 'react'

interface Props {
  courseId: number
}

const PurchaseCourseButton: React.FC<Props> = ({ courseId }) => {
  const [purchaseCourse] = usePurchaseCourseMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()

  const handleSubmit = async () => {
    try {
      const { data } = await purchaseCourse({ variables: { courseId: courseId } })
      console.log(data?.purchaseCourse?.purchasedCourse)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }
  return (
    <>
      <button className="btn" type="submit" onClick={handleSubmit}>
        Purchase Course
      </button>
      <p className="status-text">{errMsg}</p>
    </>
  )
}

export default PurchaseCourseButton

'use client'

import { usePurchaseCourseMutation } from '@/graphql/generated'
import { ApolloError } from '@apollo/client'
import { useState } from 'react'

interface Props {}

const Page: React.FC<Props> = () => {
  const [purchaseCourse] = usePurchaseCourseMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()

  const handleSubmit = async () => {
    try {
      const { data } = await purchaseCourse({ variables: { courseId: 1 } })
      console.log(data?.purchaseCourse?.purchasedCourse)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
      console.log(errMsg)
    }
  }

  return (
    <>
      <h1>Course Page</h1>
      <button className="btn" type="submit" onClick={handleSubmit}>
        Purchase Course
      </button>
    </>
  )
}

export default Page

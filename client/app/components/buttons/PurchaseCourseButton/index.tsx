'use client'

import { useContext } from 'react'
import { SessionContext } from '@/app/providers/SessionProvider'
import { usePurchaseCourseMutation } from '@/graphql/generated'
import { useRouter } from 'next/navigation'

interface Props {
  courseId: number
  slug: string
}

const PurchaseCourseButton: React.FC<Props> = ({ courseId, slug }) => {
  const { currentUser } = useContext(SessionContext)
  const router = useRouter()

  const [purchaseCourse] = usePurchaseCourseMutation({
    notifyOnNetworkStatusChange: true,
  })

  const handleClick = async () => {
    if (!currentUser) {
      router.push(`/register?course_slug=${slug}`)
    }
    const { data } = await purchaseCourse({ variables: { courseId: courseId } })
    console.log(data?.purchaseCourse?.purchasedCourse)
  }
  return (
    <>
      <button className="btn" type="submit" onClick={handleClick}>
        Purchase Course
      </button>
    </>
  )
}

export default PurchaseCourseButton

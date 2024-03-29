import Link from 'next/link'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { getPurchasedCourses } from '@/utils/getPurchasedCourses'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()
  const purchasedCourses = await getPurchasedCourses()

  return (
    <>
      <h1>Hello {currentUser?.email ?? 'user'}!</h1>
      <ul>
        Here your purchased courses:
        {purchasedCourses?.map(course => (
          <li key={course.id}>
            <Link href={`/user/courses/${course.slug}`}>
              <h3>{course.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page

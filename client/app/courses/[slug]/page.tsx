import { getClient } from '@/apollo/ApolloClient'
import { notFound } from 'next/navigation'
import PurchaseCourseButton from '@/app/components/buttons/PurchaseCourseButton'
import { GetCourseDataDocument, GetCourseDataQuery } from '@/graphql/generated'
import { OperationVariables } from '@apollo/client'

interface Props {
  params: { slug: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const slug = params.slug
  const { data } = await getClient().query<GetCourseDataQuery>({
    query: GetCourseDataDocument,
    variables: { slug },
  })

  if (!data.getCourseData) {
    notFound()
  }

  return (
    <>
      <h1>Course Page</h1>
      <PurchaseCourseButton courseId={data.getCourseData.id} />
    </>
  )
}

export default Page

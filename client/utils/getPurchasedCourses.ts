'use server'

import { getClient } from '@/apollo/ApolloClient'
import { GetPurchasedCoursesQuery, GetPurchasedCoursesDocument } from '@/graphql/generated'

export const getPurchasedCourses = async () => {
  const { data } = await getClient().query<GetPurchasedCoursesQuery>({
    query: GetPurchasedCoursesDocument,
  })
  return data.getPurchasedCourses
}

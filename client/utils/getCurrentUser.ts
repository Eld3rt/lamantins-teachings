'use server'

import { getClient } from '@/apollo/ApolloClient'
import { MeQuery, MeDocument } from '@/graphql/generated'

export const getCurrentUser = async () => {
  const { data } = await getClient().query<MeQuery>({
    query: MeDocument,
  })
  return data.me
}

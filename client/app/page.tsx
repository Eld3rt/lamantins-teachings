import { MeQuery, MeDocument } from '@/graphql/generated'
import { getClient } from '@/apollo/ApolloClient'

interface Props {}

const Page: React.FC<Props> = async () => {
  const { data } = await getClient().query<MeQuery>({
    query: MeDocument,
  })

  return (
    <main>
      <h1>Lamantins greetings you, {data.me?.email ?? 'user'}</h1>
    </main>
  )
}

export default Page

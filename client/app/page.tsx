import { MeQuery, MeDocument } from '@/graphql/types_and_hooks'
import { getClient } from '@/lib/ApolloClient'

interface Props {}

const Home: React.FC<Props> = async () => {
  const { data } = await getClient().query<MeQuery>({
    query: MeDocument,
  })

  return (
    <main>
      <h1>Lamantins greetings you, {data.me?.email ?? 'user'}</h1>
    </main>
  )
}

export default Home

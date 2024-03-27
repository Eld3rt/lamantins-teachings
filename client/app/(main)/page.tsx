import { getCurrentUser } from '@/utils/getCurrentUser'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()
  return (
    <main>
      <h1>Lamantins greetings you, {currentUser?.email ?? 'user'}</h1>
    </main>
  )
}

export default Page

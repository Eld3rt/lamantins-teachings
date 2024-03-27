import { getCurrentUser } from '@/utils/getCurrentUser'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return <h1>Hello {currentUser?.email ?? 'user'}!</h1>
}

export default Page

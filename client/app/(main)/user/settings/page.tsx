import { getCurrentUser } from '@/utils/getCurrentUser'
import UpdateUserName from '@/app/components/UpdateUserName'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return <>{currentUser ? <UpdateUserName currentName={currentUser.name} /> : <p>Error fetching data</p>}</>
}

export default Page

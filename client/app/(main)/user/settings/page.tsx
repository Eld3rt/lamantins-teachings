import { getCurrentUser } from '@/utils/getCurrentUser'
import UpdateUserName from '@/app/components/UpdateUserName'
import UpdateEmail from '@/app/components/UpdateEmail'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return currentUser ? (
    <>
      <UpdateUserName currentName={currentUser.name} />
      <UpdateEmail currentEmail={currentUser.email} />
    </>
  ) : (
    <p>Error fetching data</p>
  )
}

export default Page

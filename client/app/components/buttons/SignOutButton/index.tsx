'use client'

import { useSignOutMutation } from '@/graphql/generated'
import { useApolloClient } from '@apollo/client'
import { clearCookie } from '@/utils/clearCookie'

interface Props {}

const SignOutButton: React.FC<Props> = () => {
  const client = useApolloClient()

  const [signOut] = useSignOutMutation({
    notifyOnNetworkStatusChange: true,
  })

  const handleClick = async () => {
    await signOut()
      .then(() => clearCookie())
      .then(() => client.resetStore())
      .then(() => location.reload())
  }
  return (
    <>
      <button className="btn" type="submit" onClick={handleClick}>
        Sign Out
      </button>
    </>
  )
}

export default SignOutButton

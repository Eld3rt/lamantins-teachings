'use client'

import { useApolloClient } from '@apollo/client'
import { logout } from '@/utils/logout'

interface Props {}

const SignOut: React.FC<Props> = () => {
  const client = useApolloClient()

  return (
    <button className="btn" onClick={() => logout().then(() => client.resetStore())}>
      Sign Out
    </button>
  )
}

export default SignOut

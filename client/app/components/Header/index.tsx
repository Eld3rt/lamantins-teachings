import React from 'react'
import Link from 'next/link'
import SignOut from '../SignOut'
import { getCurrentUser } from '@/utils/getCurrentUser'

interface Props {}

const Header: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/register">Sign Up</Link>
          </li>
          {!currentUser ? (
            <li>
              <Link href="/login">Sign In</Link>
            </li>
          ) : (
            <SignOut />
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

import React from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/utils/getCurrentUser'
import SignOutButton from '../buttons/SignOutButton'

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
            <SignOutButton />
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

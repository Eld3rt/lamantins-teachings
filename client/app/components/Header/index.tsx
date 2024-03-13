'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { logout } from '@/utils/logout'
import Modal from '../Modal'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

interface Props {}

const Header: React.FC<Props> = props => {
  const [hideSignInModal, setHideSignInModal] = useState(true)
  const [hideSignUpModal, setHideSignUpModal] = useState(true)

  const toggleSignInModal = () => setHideSignInModal(!hideSignInModal)
  const toggleSignUpModal = () => setHideSignUpModal(!hideSignUpModal)

  const configSigInModal = {
    hideModal: hideSignInModal,
    toggleModal: toggleSignInModal,
  }

  const configSigUpModal = {
    hideModal: hideSignUpModal,
    toggleModal: toggleSignUpModal,
  }

  const client = useApolloClient()

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <button className="btn" onClick={() => toggleSignInModal()}>
              Sign In
            </button>
            <Modal {...configSigInModal}>
              <SignIn />
            </Modal>
          </li>
          <li>
            <button className="btn" onClick={() => toggleSignUpModal()}>
              Sign Up
            </button>
            <Modal {...configSigUpModal}>
              <SignUp />
            </Modal>
          </li>
          <button className="btn" onClick={() => logout().then(() => client.resetStore())}>
            Sign Out
          </button>
        </ul>
      </nav>
    </header>
  )
}

export default Header

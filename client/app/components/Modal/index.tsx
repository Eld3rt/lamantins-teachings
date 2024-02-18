import React from 'react'
import './style.scss'

interface Props {
  hideModal: boolean
  toggleModal: any
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null

  return (
    <div className="modalOverlay" onClick={e => e.currentTarget === e.target && toggleModal()}>
      <div className="modalWrap">
        <div className="modal">{children}</div>
      </div>
    </div>
  )
}

export default Modal

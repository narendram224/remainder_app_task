import React from "react"

import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
const Model = ({ open, onCloseModal, children }) => {
  return (
    <Modal open={open} onClose={onCloseModal} center>
      {children}
    </Modal>
  )
}

export default Model

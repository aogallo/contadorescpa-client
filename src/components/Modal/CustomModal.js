import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CustomModal = ({ title, message, handleClose, handleAction }) => {
  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminación de {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Esta seguro de eliminar este registro!
        {message && (
          <div
            className={
              message.error ? 'alert alert-danger' : 'alert alert-success'
            }
          >
            {message.message}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleAction}>
          Eliminar
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal

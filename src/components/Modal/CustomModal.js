import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CustomModal.css'

const CustomModal = (props) => {
  const handleCancel = () => {
    console.log('cancel button')
    props.handleClose()
  }

  const handleSubmit = () => {
    console.log('submit button')
    props.handleAction()
  }

  return (
    <div className='overlay'>
      <div className='modal-container'>
        <div className='modal-title'>
          <h3>Confirmacion</h3>
        </div>
        <div className='modal-content'>
          <div className='modal-icon'>
            <FontAwesomeIcon icon='fa-exclamation' />
          </div>
          <p className='modal-text'>
            Esta seguro de eliminar el registro?
          </p>
        </div>
        <div className='modal-actions'>
          <button className='btn-cancel' onClick={handleCancel}>
            <span>Cancelar</span>
          </button>
          <button className='btn-delete' onClick={handleSubmit}>
            <FontAwesomeIcon icon='fa-trash' className='model-table-icon' />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomModal

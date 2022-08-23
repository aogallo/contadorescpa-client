import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CustomModal.css'

const CustomModal = () => {
  return (
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
        <button className='btn-cancel'>
          <span>Cancelar</span>
        </button>
        <button className='btn-delete'>
          <FontAwesomeIcon icon='fa-trash' className='model-table-icon'/>
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  )
}

export default CustomModal

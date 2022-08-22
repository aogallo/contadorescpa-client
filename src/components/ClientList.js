import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

// import CustomModal from './Modal/CustomModal'

import { GET_ALL_CLIENTS } from '../graphql/Client/queries'
import { DELETE_CLIENT } from '../graphql/Client/mutations'

import 'components/ClientList/ClientList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ClientList = ({ title }) => {
  const { refetch, data } = useQuery(GET_ALL_CLIENTS)
  const [deleteClientById] = useMutation(DELETE_CLIENT)
  const [clients, setClients] = useState([])
  const [clientDelete, setClientDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (data) setClients(data.getAllClients)
    console.log(data)
  }, [data])

  const handleClose = () => {
    setShowModal(false)
  }

  const handleShowModal = (client) => {
    setClientDelete(client)
    setShowModal(true)
  }

  const handleAction = async () => {
    try {
      await deleteClientById({
        variables: { id: clientDelete.id }
      })

      setMessage({ error: false, message: 'Cliente eliminado' })
      setTimeout(() => {
        setShowModal(false)
        setMessage('')
        refetch()
      }, 1500)
    } catch (error) {
      setMessage({ error: true, message: error.message })
    }
  }

  return (
    <>
      <div className=''>
        <div className=''>
          <section>
            <i className='fas fa-table me-1' />
            {title}
          </section>
          <Link className='' to='/client/add'>
            Agregar
          </Link>
        </div>
        <div className=''>
          <table className=''>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>NIT</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className='table-row'>
                  <td>{client.name}</td>
                  <td>{client.nit}</td>
                  <td>{client.address}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td className='col-sm-2'>
                    <NavLink
                      type='button'
                      to={`/client/edit/${client.id}`}
                      className=''
                    >
                      <FontAwesomeIcon icon='fa-edit' className='table-icon'/>
                    </NavLink>
                    <button
                      type='button'
                      onClick={() => handleShowModal(client)}
                      className=''
                    >
                      <FontAwesomeIcon icon='fa-trash-alt' size='3x' className='table-icon'/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        //<CustomModal
        //  title='cliente'
        //  message={message}
        //  handleAction={handleAction}
        //  handleClose={handleClose}
        ///>
        <h1>modal</h1>
      )}
    </>
  )
}

export default ClientList

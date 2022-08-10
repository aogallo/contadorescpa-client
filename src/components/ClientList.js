import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

// import CustomModal from './Modal/CustomModal'

import { GET_ALL_CLIENTS } from '../graphql/Client/queries'
import { DELETE_CLIENT } from '../graphql/Client/mutations'

const ClientList = ({ title }) => {
  const { refetch, data } = useQuery(GET_ALL_CLIENTS)
  const [deleteClientById] = useMutation(DELETE_CLIENT)
  const [clients, setClients] = useState([])
  const [clientDelete, setClientDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (data) setClients(data.getAllClients)
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
      <div className='card mb-4'>
        <div className='card-header d-flex justify-content-between'>
          <section>
            <i className='fas fa-table me-1' />
            {title}
          </section>
          <Link className='btn btn-primary' to='/client/add'>
            Agregar
          </Link>
        </div>
        <div className='card-body'>
          <table className='table table-responsive table-striped'>
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
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.nit}</td>
                  <td>{client.address}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td className='col-sm-2'>
                    <NavLink
                      type='button'
                      to={`/client/edit/${client.id}`}
                      className='btn btn-primary btn-sm'
                    >
                      Editar
                    </NavLink>
                    <button
                      type='button'
                      onClick={() => handleShowModal(client)}
                      className='btn btn-danger btn-sm'
                    >
                      Eliminar
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

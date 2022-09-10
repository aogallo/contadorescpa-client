import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import CustomModal from './Modal/CustomModal'

import { GET_ALL_CLIENTS } from '../graphql/Client/queries'
import { DELETE_CLIENT } from '../graphql/Client/mutations'

import 'components/ClientList/ClientList.css'
import CustomModal from './Modal/CustomModal'
import Table from 'components/Table'

const columns = [
  { column: 'Nombre', key: 'name' },
  { column: 'Nit', key: 'nit' },
  { column: 'Dirección', 'key': 'address' },
  { column: 'Correo', 'key': 'email' },
  { column: 'Telefono', 'key': 'phone' },
  { column: 'Acciones', key: 'actions' }
]

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
      }, 1000)
    } catch (error) {
      setMessage({ error: true, message: error.message })
    }
  }

  return (
    <>
      <div className=''>
        <div className='btn-add'>
          <Link to='/client/add'>
            <FontAwesomeIcon icon='fa-plus' className='add-icon'/>
          </Link>
        </div>
        <Table columns={columns} editRoute='/client/edit/' data={clients}/>
      </div>
      {showModal && (
        <CustomModal handleClose={handleClose} handleAction={handleAction}/>
      )}
    </>
  )
}

export default ClientList

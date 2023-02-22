import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { GET_ALL_CLIENTS } from 'graphql/Client/queries'
import { DELETE_CLIENT } from 'graphql/Client/mutations'

import 'components/ClientList/ClientList.css'
import CustomModal from 'components/Modal/CustomModal'
import Table from 'components/Table'

const columns = [
  { column: 'Nombre', key: 'name' },
  { column: 'Nit', key: 'nit' },
  { column: 'Dirección', 'key': 'address' },
  { column: 'Correo', 'key': 'email' },
  { column: 'Telefono', 'key': 'phone' },
  { column: 'Acciones', key: 'actions' }
]

const ClientList = () => {
  const { refetch, data } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  })
  const [deleteClientById] = useMutation(DELETE_CLIENT)
  const [clients, setClients] = useState([])
  const [clientDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (data) setClients(data.getAllClients)
  }, [data])

  const handleClose = () => {
    setShowModal(false)
  }

  const handleAction = async () => {
    try {
      await deleteClientById({
        variables: { id: clientDelete.id }
      })

      // setMessage({ error: false, message: 'Cliente eliminado' })
      setTimeout(() => {
        setShowModal(false)
        // setMessage('')
        refetch()
      }, 1000)
    } catch (error) {
      // TODO add error to boundary erros
      console.log('error', error)
    }
  }

  return (
    <>
      <Table columns={columns} editRoute='/client/edit/' data={clients} />
      {
        showModal && (
          <CustomModal handleClose={handleClose} handleAction={handleAction} />
        )
      }
    </>
  )
}

export default ClientList

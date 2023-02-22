import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_PROVIDERS } from '../graphql/Provider/queries'
import Table from './Table'
// import CustomModal from './Modal/CustomModal'

const columns = [
  { column: 'Nombre', key: 'name' },
  { column: 'Nit', key: 'nit' },
  { column: 'Dirección', 'key': 'address' },
  { column: 'Correo', 'key': 'email' },
  { column: 'Telefono', 'key': 'phone' },
  { column: 'Acciones', key: 'actions' }
]

const ProviderList = () => {
  const { data } = useQuery(GET_ALL_PROVIDERS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  })
  // const [deleteProviderById] = useMutation(DELETE_PROVIDER)
  const [providers, setProviders] = useState([])
  // const [providerDelete, setProviderDelete] = useState(null)
  // const [setShowModal] = useState(false)
  // const [setMessage] = useState('')

  useEffect(() => {
    if (data) setProviders(data.getAllProviders)
  }, [data])

  // const handleShowModal = (provider) => {
  //   setProviderDelete(provider)
  //   setShowModal(true)
  // }

  // const handleClose = () => {
  //   setShowModal(false)
  // }

  // const handleAction = async () => {
  //   try {
  //     await deleteProviderById({
  //       variables: { id: providerDelete.id }
  //     })

  //     setMessage({ error: false, message: 'Proveedor eliminado' })
  //     setTimeout(() => {
  //       setShowModal(false)
  //       setMessage('')
  //       refetch()
  //     }, 1500)
  //   } catch (error) {
  //     setMessage({ error: true, message: error.message })
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <Table columns={columns}
        data={providers}
        editRoute='edit/' />
    </>
  )
}

export default ProviderList

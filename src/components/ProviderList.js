import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_PROVIDERS } from '../graphql/Provider/queries'
import { DELETE_PROVIDER } from '../graphql/Provider/mutations'
// import CustomModal from './Modal/CustomModal'

const ProviderList = ({ title }) => {
  const { loading, refetch, data } = useQuery(GET_ALL_PROVIDERS)
	const [deleteProviderById] = useMutation(DELETE_PROVIDER)
  const [providers, setProviders] = useState([])
  const [providerDelete, setProviderDelete] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (data) setProviders(data.getAllProviders)
  }, [data])

  const handleShowModal = (provider) => {
    setProviderDelete(provider)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleAction = async () => {
    try {
      await deleteProviderById({
        variables: { id: providerDelete.id }
      })

      setMessage({ error: false, message: 'Proveedor eliminado' })
      setTimeout(() => {
        setShowModal(false)
        setMessage('')
        refetch()
      }, 1500)
    } catch (error) {
      setMessage({ error: true, message: error.message })
      console.log(error)
    }
  }

  return (
    <section className='card mb-4'>
      <section className='card-header d-flex justify-content-between'>
        <section>
          <i className='fas fa-table me-1' />
          {title}
        </section>
        <Link className='btn btn-primary' to='/provider/add'>
          Agregar
        </Link>
      </section>
      <section className='card-body'>
        <table className='table table-responsive table-striped'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>NIT</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? (
                <tr className='col-sm-6'>
                  <td>Cargarndo...</td>
                </tr>
                )
              : (
                  providers.map((provider) => (
                    <tr key={provider.id}>
                      <td>{provider.name}</td>
                      <td>{provider.nit}</td>
                      <td>{provider.email}</td>
                      <td>{provider.address}</td>
                      <td>{provider.phone}</td>
                      <td className='col-sm-2'>
                        <NavLink
                          to={`/provider/edit/${provider.id}`}
                          className='btn btn-primary btn-sm'
                        >
                          Editar
                        </NavLink>
                        <button
                          type='button'
                          onClick={() => handleShowModal(provider)}
                          className='btn btn-danger btn-sm'
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default ProviderList

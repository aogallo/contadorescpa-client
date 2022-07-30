import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import { GET_ALL_CLIENTS, GET_CLIENT_BY_ID } from '../graphql/Client/queries'
import { CREATE_CLIENT, UPDATE_CLIENT } from '../graphql/Client/mutations'

const ClientForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [createClient, { reset }] = useMutation(CREATE_CLIENT)
  const [updateClient] = useMutation(UPDATE_CLIENT)
  const [getClientById, { data }] = useLazyQuery(GET_CLIENT_BY_ID)

  const { company } = useContext(AppContext)
  const [message, setMessage] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [clientValues, setClientValues] = useState({
    id: 0,
    name: '',
    nit: '',
    address: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (!company.name) navigate('/')

    if (params.id) {
      setIsEditing(true)
      getClientById({ variables: { id: params.id } })
    }
  }, [])

  useEffect(() => {
    if (data) {
      setClientValues({
        id: data.getClientById.id,
        name: data.getClientById.name,
        nit: data.getClientById.nit,
        address: data.getClientById.address,
        email: data.getClientById.email,
        phone: data.getClientById.phone,
      })
    }
  }, [data])

  const validateFields = (values) => {
    let errors = {}

    if (!values.name) {
      errors.name = ' Por favor ingresa tu nombre'
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
      errors.name = ' El nombre solo puede contener letras y espacios'
    }

    if (!values.nit) {
      errors.nit = ' Por favor ingresa el número de NIT'
    }

    if (!values.address) {
      errors.address = ' Por favor ingresa una dirección válida '
    }

    if (!values.email) {
      errors.email = 'Por favor ingresa una dirección de correo eletrónico'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'El correo ingresado es invalido'
    }

    if (!values.phone) {
      errors.phone = ' Por favor ingresa un número de teléfono '
    } else if (!/^\d*$/.test(values.phone)) {
      errors.phone = ' El número de teléfono es invalido'
    }

    return errors
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const handleCreateClient = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        await updateClient({
          variables: {
            client: {
              id: values.id,
              name: values.name,
              nit: values.nit,
              address: values.address,
              email: values.email,
              phone: values.phone,
              idCompany: company.id,
            },
          },
          refetchQueries: [{ query: GET_ALL_CLIENTS }],
        })
      } else {
        await createClient({
          variables: {
            client: {
              id: 0,
              name: values.name,
              nit: values.nit,
              address: values.address,
              email: values.email,
              phone: values.phone,
              idCompany: company.id,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [{ query: GET_ALL_CLIENTS }],
        })
      }

      setMessage({
        error: false,
        message: `Cliente ${
          isEditing ? 'actualizado' : 'creado'
        } correctamente`,
      })
      setTimeout(() => {
        setMessage(null)
        navigate(-1)
        resetForm()
        reset()
      }, 1500)
    } catch (error) {
      reset()
      setMessage({ error: true, message: error.message })
      console.log(error)
    }
  }

  return (
    <div className='container-fluid px-4'>
      <div className='col-sm-12'>
        <div className='card'>
          <div className='card-header'>
            <button onClick={handleCancel} className='btn'>
              <i className='fas fa-arrow-left'></i>
            </button>
            {isEditing ? 'Editar' : 'Agregar'} Cliente
          </div>
          <div className='card-body'>
            {/* INICIO DE FORMULARIO */}

            <Formik
              enableReinitialize
              initialValues={clientValues}
              validate={validateFields}
              onSubmit={handleCreateClient}>
              {({
                values,
                touched,
                handleSubmit,
                handleChange,
                errors,
                handleBlur,
              }) => (
                <form className='agregCliente' onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className='mb-3 row'>
                    <label htmlFor='name' className='col-sm-2 form-label'>
                      Nombre
                    </label>
                    <div className='col-sm-10'>
                      <input
                        className='form-control'
                        name='name'
                        id='name'
                        type='text'
                        value={values.name}
                        onChange={handleChange}
                        autoComplete='off'
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.name && (
                        <div className='error' style={{ color: 'red' }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NIT */}
                  <div className='mb-3 row'>
                    <label htmlFor='nit' className='col-sm-2 form-label'>
                      NIT
                    </label>
                    <div className='col-sm-10'>
                      <input
                        className='form-control'
                        name='nit'
                        id='nit'
                        type='text'
                        value={values.nit}
                        onChange={handleChange}
                        autoComplete='off'
                        onBlur={handleBlur}
                      />
                      {touched.nit && errors.nit && (
                        <div className='error' style={{ color: 'red' }}>
                          {errors.nit}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className='mb-3 row'>
                    <label htmlFor='address' className='col-sm-2 form-label'>
                      Dirección
                    </label>
                    <div className='col-sm-10'>
                      <textarea
                        id='address'
                        className='form-control'
                        name='address'
                        value={values.address}
                        onChange={handleChange}
                        autoComplete='off'
                        onBlur={handleBlur}
                      />
                      {touched.address && errors.address && (
                        <div className='error' style={{ color: 'red' }}>
                          {errors.address}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className='mb-3 row'>
                    <label htmlFor='email' className='col-sm-2 form-label'>
                      Correo
                    </label>
                    <div className='col-sm-10'>
                      <input
                        className='form-control'
                        name='email'
                        id='email'
                        type='text'
                        placeholder='name@example.com'
                        value={values.email}
                        onChange={handleChange}
                        autoComplete='off'
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div className='error' style={{ color: 'red' }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className='mb-3 row'>
                    <label htmlFor='phone' className='col-sm-2 form-label'>
                      Teléfono
                    </label>
                    <div className='col-sm-10'>
                      <input
                        className='form-control'
                        name='phone'
                        id='phne'
                        type='text'
                        value={values.phone}
                        onChange={handleChange}
                        autoComplete='off'
                        onBlur={handleBlur}
                      />
                      {touched.phone && errors.phone && (
                        <div className='error' style={{ color: 'red' }}>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  {message && (
                    <div
                      className={`message ${
                        message.error ? 'message-error' : 'message-success'
                      }`}>
                      {message.message}
                    </div>
                  )}

                  <div className=''>
                    <button type='submit' className='btn btn-primary'>
                      Guardar
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={handleCancel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientForm

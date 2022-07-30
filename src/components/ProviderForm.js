import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { AppContext } from '../context/AppContext'

import {
  GET_ALL_PROVIDERS,
  GET_PROVIDER_BY_ID,
} from '../graphql/Provider/queries'
import {
  CREATE_PROVIDER,
  UPDATE_PROVIDER,
} from '../graphql/Provider/mutations'

const ProviderForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { company } = useContext(AppContext)
  const [message, setMessage] = useState(null)
  const [createProvider] = useMutation(CREATE_PROVIDER)
  const [updateProvider] = useMutation(UPDATE_PROVIDER)
  const [isEditing, setIsEditing] = useState(false)
  const [getProviderById, { data }] = useLazyQuery(GET_PROVIDER_BY_ID)
  const [providerValues, setProviderValues] = useState({
    id: 0,
    name: '',
    nit: '',
    address: '',
    email: '',
    phone: '',
    creditDay: '',
  })

  useEffect(() => {
    if (!company.name) navigate('/')

    if (params.id) {
      setIsEditing(true)
      getProviderById({ variables: { id: params.id } })
    }
  }, [])

  useEffect(() => {
    if (data) {
      setProviderValues({
        id: data.getProviderById.id,
        name: data.getProviderById.name,
        nit: data.getProviderById.nit,
        address: data.getProviderById.address,
        email: data.getProviderById.email,
        phone: data.getProviderById.phone,
        creditDay: data.getProviderById.creditDay,
      })
    }
  }, [data])

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const handleValidate = (values) => {
    let errors = {}

    if (!values.name) {
      errors.name = 'Por favor ingrese el nombre'
    }
    if (!values.nit) {
      errors.nit = 'Por favor ingrese el NIT'
    }

    if (!values.email) {
      errors.email = 'Por favor ingresa una dirección de correo eletrónico'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'El correo ingresado es invalido'
    }

    return errors
  }

  const handleCreateProvider = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        await updateProvider({
          variables: {
            provider: {
              id: values.id,
              name: values.name,
              nit: values.nit,
              address: values.address,
              email: values.email,
              phone: values.phone,
              creditDay: Number(values.creditDay),
              idCompany: company.id,
            },
          },
          refetchQueries: [{ query: GET_ALL_PROVIDERS }],
        })
      } else {
        await createProvider({
          variables: {
            provider: {
              id: 0,
              name: values.name,
              nit: values.nit,
              address: values.address,
              email: values.email,
              phone: values.phone,
              creditDay: Number(values.creditDay),
              idCompany: company.id,
            },
          },
          refetchQueries: [{ query: GET_ALL_PROVIDERS }],
        })
      }

      setMessage({
        error: false,
        message: `Proveedor ${
          isEditing ? 'actualizado' : 'creado'
        } correctamente`,
      })
      setTimeout(() => {
        setMessage(null)
        resetForm()
        navigate(-1)
      }, 1500)
    } catch (error) {
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
            {isEditing ? 'Editar' : 'Agregar'} Proveedor
          </div>
          <div className='card-body'>
            <Formik
              enableReinitialize
              initialValues={providerValues}
              validate={handleValidate}
              onSubmit={handleCreateProvider}>
              {({ errors, touched }) => (
                <Form>
                  {/* Name */}
                  <div className='mb-3 row'>
                    <label htmlFor='name' className='col-sm-2 form-label'>
                      Nombre
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        id='name'
                        name='name'
                        type='text'
                        className='form-control'
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className='error' style={{ color: 'red' }}>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* NIT */}
                  <div className='mb-3 row'>
                    <label htmlFor='nit' className='col-sm-2 form-label'>
                      NIT
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        id='nit'
                        name='nit'
                        type='text'
                        className='form-control'
                      />
                    </div>
                    {touched.nit && errors.nit && (
                      <div className='error' style={{ color: 'red' }}>
                        {errors.nit}
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className='mb-3 row'>
                    <label htmlFor='address' className='col-sm-2 form-label'>
                      Dirección
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        id='address'
                        name='address'
                        className='form-control'
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className='mb-3 row'>
                    <label htmlFor='email' className='col-sm-2 form-label'>
                      Correo
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        name='email'
                        type='email'
                        id='email'
                        className='form-control'
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className='error' style={{ color: 'red' }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className='mb-3 row'>
                    <label htmlFor='phone' className='col-sm-2 form-label'>
                      Teléfono
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        className='form-control'
                        name='phone'
                        type='text'
                      />
                    </div>
                  </div>

                  {/* Credit day */}
                  <div className='mb-3 row'>
                    <label htmlFor='creditDay' className='col-sm-2 form-label'>
                      Días de credito
                    </label>
                    <div className='col-sm-10'>
                      <Field
                        name='creditDay'
                        type='text'
                        className='form-control'
                        id='creditDay'
                      />
                    </div>
                  </div>
                  {message && (
                    <div
                      className={`message ${
                        message.error ? 'message-error' : 'message-success'
                      }`}>
                      {message.message}
                    </div>
                  )}
                  <div className=''>
                    <button
                      type='button'
                      type='submit'
                      className='btn btn-primary'>
                      Guardar
                    </button>
                    <button
                      type='button'
                      onClick={handleCancel}
                      className='btn btn-danger'>
                      Cancelar
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderForm

import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { Formik, Field } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import Message from 'components/Message'
import { GET_ALL_CLIENTS, GET_CLIENT_BY_ID } from '../graphql/Client/queries'
import { CREATE_CLIENT, UPDATE_CLIENT } from '../graphql/Client/mutations'
import { GET_ALL_COMPANIES } from '../graphql/Company/queries'

import { validatedFormFields } from 'utils/fieldValidation'

import 'components/ClientForm/ClientForm.css'

const ClientForm = () => {
  const [createClient, { reset }] = useMutation(CREATE_CLIENT)
  const [updateClient] = useMutation(UPDATE_CLIENT)
  const [getClientById, { data }] = useLazyQuery(GET_CLIENT_BY_ID)
  const { data: companiesList } = useQuery(GET_ALL_COMPANIES)
  const navigate = useNavigate()
  const params = useParams()

  const [companies, setCompanies] = useState([{id: 0, name: 'Seleccione una Compañia'}])
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
    idCompany: ''
  })

  useEffect(() => {
    // if (!company.name) navigate('/')

    if (params.id) {
      setIsEditing(true)
      getClientById({ variables: { id: params.id } })
    }
  }, [])

  useEffect(() => {
    if (companiesList) {
      setCompanies((prevState) => {
        return [...prevState, ...companiesList.getAllCompanies]
      })
    }
  }, [companiesList])

  useEffect(() => {
    if (data) {
      setClientValues({
        id: data.getClientById.id,
        name: data.getClientById.name,
        nit: data.getClientById.nit,
        address: data.getClientById.address,
        email: data.getClientById.email,
        phone: data.getClientById.phone
      })
    }
  }, [data])

  const validateFields = (values) => {
    let errors = {}

    errors = validatedFormFields(values, ['name'])

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

    if (!values.idCompany) {
      errors.idCompany = 'Seleccione una compañia'
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
              // idCompany: company.id
              idCompany: values.idCompany.split('-')[0].trim()
            }
          },
          refetchQueries: [{ query: GET_ALL_CLIENTS }]
        })
      } else {
        console.log(values)
        await createClient({
          variables: {
            client: {
              id: 0,
              name: values.name,
              nit: values.nit,
              address: values.address,
              email: values.email,
              phone: values.phone,
              // idCompany: company.id
              idCompany: values.idCompany.split('-')[0].trim()
            }
          },
          awaitRefetchQueries: true,
          refetchQueries: [{ query: GET_ALL_CLIENTS }]
        })
      }

      setMessage({
        error: false,
        message: `Cliente ${isEditing ? 'actualizado' : 'creado'
          } correctamente`
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
    <div className='form-container'>
      <div className='form-header'>
        {/*<button onClick={handleCancel} className=''>
          <i className='fas fa-arrow-left' />
        </button>*/}
        {isEditing ? 'Editar' : 'Agregar'} Cliente
      </div>
      <div className='form-content'>
        {/* INICIO DE FORMULARIO */}

        <Formik
          enableReinitialize
          initialValues={clientValues}
          validate={validateFields}
          onSubmit={handleCreateClient}
        >
          {({
            values,
            touched,
            handleSubmit,
            handleChange,
            errors,
            handleBlur
          }) => (
            <form className='' onSubmit={handleSubmit}>
              {/* Name */}
              <div className='form-control-container'>
                <label htmlFor='name' className=''>
                  Nombre
                </label>
                <input
                  className=''
                  name='name'
                  id='name'
                  type='text'
                  placeholder='Cándido López Canaletti'
                  value={values.name}
                  onChange={handleChange}
                  autoComplete='off'
                  onBlur={handleBlur}
                />
              </div>
              {touched.name && errors.name && (
                <Message message={errors.name} />
              )}

              {/* NIT */}
              <div className='form-control-container'>
                <label htmlFor='nit' className=''>
                  NIT
                </label>
                <input
                  className=''
                  name='nit'
                  id='nit'
                  type='text'
                  placeholder='678934013'
                  value={values.nit}
                  onChange={handleChange}
                  autoComplete='off'
                  onBlur={handleBlur}
                />
              </div>
              {touched.nit && errors.nit && (
                <Message message={errors.nit} />
              )}

              {/* Address */}
              <div className='form-control-container'>
                <label htmlFor='address' className=''>
                  Dirección
                </label>
                <textarea
                  id='address'
                  className=''
                  placeholder='57ª Calle 35-67 Zona 24, Guatemala, Guatemala.'
                  name='address'
                  value={values.address}
                  onChange={handleChange}
                  autoComplete='off'
                  onBlur={handleBlur}
                />
              </div>
              {touched.address && errors.address && (
                <Message message={errors.address} />
              )}

              {/* Email */}
              <div className='form-control-container'>
                <label htmlFor='email' className=''>
                  Correo
                </label>
                <input
                  className=''
                  name='email'
                  id='email'
                  type='text'
                  placeholder='name@example.com'
                  value={values.email}
                  onChange={handleChange}
                  autoComplete='off'
                  onBlur={handleBlur}
                />
              </div>
              {
                touched.email && errors.email && (
                  <Message message={errors.email} />
                )
              }

              {/* Phone */}
              <div className='form-control-container'>
                <label htmlFor='phone' className=''>
                  Teléfono
                </label>
                <input
                  className=''
                  name='phone'
                  placeholder='23344512'
                  id='phne'
                  type='text'
                  value={values.phone}
                  onChange={handleChange}
                  autoComplete='off'
                  onBlur={handleBlur}
                />
              </div>
              {
                touched.phone && errors.phone && (
                  <Message message={errors.phone} />
                )
              }

              {/* Company */}
              <div className='form-control-container'>
                <label htmlFor='idCompany'>Compa&ntilde;ia</label>
                <select
                  name='idCompany'
                  id='idCompany'
                  onChange={handleChange}
                  placeholder='Compañia'
                  value={values.idCompany}>
                  {
                    companies &&
                    companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)
                  }
                </select>
              </div>
              {
                touched.idCompany && errors.idCompany && (
                  <Message message={errors.idCompany} />
                )
              }

              {/* Message */}
              {
                message && (
                  <div
                    className={`message ${message.error ? 'message-error' : 'message-success'
                      }`}
                  >
                    {message.message}
                  </div>
                )
              }

              <div className='form-actions'>
                <button type='submit' className='btn-save'>
                  Guardar
                </button>
                <button
                  type='button'
                  className='btn-cancel'
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ClientForm

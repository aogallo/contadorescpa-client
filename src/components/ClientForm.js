import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { Formik, Field } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import Message from 'components/Message/Message'
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

  const [companies, setCompanies] = useState([{ id: 0, name: 'Seleccione una Compañia' }])
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
      console.log("data", data.getClientById)
      setClientValues({
        id: data.getClientById.id,
        name: data.getClientById.name,
        nit: data.getClientById.nit,
        address: data.getClientById.address,
        email: data.getClientById.email,
        phone: data.getClientById.phone,
        // idCompany: data.getClientById.idCompany
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
    <div className='container'>
      <div className='container__title'>
        {isEditing ? 'Editar' : 'Agregar'} Cliente
      </div>
      <div className='form'>
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
            <form className='form__container' onSubmit={handleSubmit}>
              <div className='form__group--column'>
                {/* Name */}
                <div className='form__control'>
                  <label htmlFor='name' className='form__label'>
                    Nombre
                  </label>
                  <input
                    className='form__input'
                    name='name'
                    id='name'
                    type='text'
                    placeholder='Cándido López Canaletti'
                    value={values.name}
                    onChange={handleChange}
                    autoComplete='off'
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <Message message={errors.name} />
                  )}
                </div>

                {/* NIT */}
                <div className='form__control'>
                  <label htmlFor='nit' className='form__label'>
                    NIT
                  </label>
                  <input
                    className='form__input'
                    name='nit'
                    id='nit'
                    type='text'
                    placeholder='678934013'
                    value={values.nit}
                    onChange={handleChange}
                    autoComplete='off'
                    onBlur={handleBlur}
                  />
                  {touched.nit && errors.nit && (
                    <Message message={errors.nit} />
                  )}
                </div>
              </div>

              <div className='form__group--column'>
                {/* Phone */}
                <div className='form__control'>
                  <label htmlFor='phone' className='form__label'>
                    Teléfono
                  </label>
                  <input
                    className='form__input'
                    name='phone'
                    placeholder='23344512'
                    id='phne'
                    type='text'
                    value={values.phone}
                    onChange={handleChange}
                    autoComplete='off'
                    onBlur={handleBlur}
                  />
                  {
                    touched.phone && errors.phone && (
                      <Message message={errors.phone} />
                    )
                  }
                </div>

                {/* Email */}
                <div className='form__control'>
                  <label htmlFor='email' className='form__label'>
                    Correo
                  </label>
                  <input
                    className='form__input'
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
              </div>

              {/* Address */}
              <div className='form__control'>
                <label htmlFor='address' className='form__label'>
                  Dirección
                </label>
                <textarea
                  id='address'
                  className='form__input form__input--textarea'
                  placeholder='57ª Calle 35-67 Zona 24, Guatemala, Guatemala.'
                  name='address'
                  value={values.address}
                  rows="5"
                  onChange={handleChange}
                  autoComplete='off'
                  onBlur={handleBlur}
                />
              </div>
              {touched.address && errors.address && (
                <Message message={errors.address} />
              )}

              {/* Company */}
              <div className='form__control'>
                <label htmlFor='idCompany' className='form__label'>Compa&ntilde;ia</label>
                <select
                  className='form__input'
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

              <div className='form__buttons--group'>
                <button type='submit' className='btn form__submit'>
                  Guardar
                </button>
                <button
                  type='button'
                  className='btn form__cancel'
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

import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { AppContext } from '../context/AppContext'

import {
  GET_ALL_PROVIDERS,
  GET_PROVIDER_BY_ID
} from '../graphql/Provider/queries'
import {
  CREATE_PROVIDER,
  UPDATE_PROVIDER
} from '../graphql/Provider/mutations'
import CustomInput from './CustomInput/CustomInput'
import { BiTrash } from 'react-icons/bi'
import Tabs from './Tabs/Tabs'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import { CREATE_PROVIDER_COMPANY, DELETE_PROVIDER_COMPANY_BY_ID } from 'graphql/ProviderCompany/mutation'
import {
  initialProviderData,
  formatterData
} from './Providers/utils/formatterData'

const ProviderForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { company } = useContext(AppContext)
  const { data: companiesData } = useQuery(GET_ALL_COMPANIES)
  const [companies, setCompanies] = useState([])
  const [message, setMessage] = useState(null)
  const [createProvider] = useMutation(CREATE_PROVIDER)
  const [deleteProviderCompanyById] = useMutation(DELETE_PROVIDER_COMPANY_BY_ID)
  const [createProviderCompany] = useMutation(CREATE_PROVIDER_COMPANY)
  const [updateProvider] = useMutation(UPDATE_PROVIDER)
  const [isEditing, setIsEditing] = useState(false)
  const [getProviderById, { data }] = useLazyQuery(GET_PROVIDER_BY_ID)
  const [selectedCompany, setSelectedCompany] = useState([])
  const [providerValues, setProviderValues] = useState(initialProviderData)

  useEffect(() => {
    if (companiesData) {
      setCompanies([{ id: 0, name: 'Seleccionar compañia', }].concat(companiesData.getAllCompanies))
    }
  }, [companiesData])

  useEffect(() => {
    if (!company.name) navigate('/')

    if (params.id) {
      setIsEditing(true)
      getProviderById({ variables: { id: params.id } })
    }
  }, [])

  useEffect(() => {
    if (data) {
      setProviderValues(formatterData(data))
    }
  }, [data])

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const handleValidate = (values) => {
    const errors = {}

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
              companies: []
            }
          },
          refetchQueries: [{ query: GET_ALL_PROVIDERS }]
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
              companies: []
            }
          },
          refetchQueries: [{ query: GET_ALL_PROVIDERS }]
          // refetchQueries: [ 'GET_ALL_PROVIDERS ']

        })
      }

      setMessage({
        error: false,
        message: `Proveedor ${isEditing ? 'actualizado' : 'creado'
          } correctamente`
      })
      setTimeout(() => {
        setMessage(null)
        resetForm()
        // if (isEditing) {
        navigate(-1)
        // }
      }, 1500)
    } catch (error) {
      setMessage({ error: true, message: error.message })
      console.log(error)
    }
  }

  const handleRemoveCompany = async ({ id }) => {
    await deleteProviderCompanyById({
      variables: {
        providerCompany: {
          id: 0,
          idCompany: id,
          idProvider: providerValues.id
        }
      },
      refetchQueries: [{ query: GET_ALL_PROVIDERS }]
      // refetchQueries: ['GET_ALL_PROVIDERS', '']
    })
  }

  const handleSelectedCompany = async (idCompany) => {
    console.log('data', idCompany)
    console.log('companie', providerValues.companies)
    const companyFind = providerValues.companies.filter(company => company.id === idCompany)
    if (companyFind.length == 0) {
      await createProviderCompany({
        variables: {
          providerCompany: {
            id: 0,
            idCompany,
            idProvider: providerValues.id
          }
        },
        // refetchQueries: [{ query: GET_ALL_PROVIDERS }]
        refetchQueries: ['GET_ALL_PROVIDERS', 'GET_ALL_COMPANIES']
      })
      setSelectedCompany([])
    }
  }

  const titles = ['Proveedor', 'Asociar compañia con proveedor']
  const content = [
    <div className='container container--tabs'>
      <div className=''>
        <Formik
          enableReinitialize
          initialValues={providerValues}
          validate={handleValidate}
          onSubmit={handleCreateProvider}
        >
          {({ values, errors, touched }) => (
            <Form>
              {/* Name */}
              <CustomInput
                label='Nombre'
                name='name'
                placeholder='Juan'
                value={values.name}
                touch={touched.name}
                errors={errors}
                changeState={setProviderValues}
                state={providerValues}
              />

              {/* NIT */}
              <CustomInput
                label='NIT'
                name='nit'
                placeholder='1233335'
                value={values.nit}
                touch={touched.nit}
                errors={errors}
                changeState={setProviderValues}
                state={providerValues}
              />

              {/* Address */}
              <CustomInput
                label='Dirección'
                name='address'
                placeholder='Guatemala ciudad capital'
                value={values.address}
                touch={touched.address}
                errors={errors}
                changeState={setProviderValues}
                state={providerValues}
              />

              {/* Email */}
              <CustomInput
                label='Correo'
                name='email'
                placeholder='juan@gmail.com'
                value={values.email}
                touch={touched.email}
                errors={errors}
                changeState={setProviderValues}
                state={providerValues}
              />

              {/* Phone */}
              <CustomInput
                label='Teléfono'
                name='phone'
                placeholder='22401129'
                value={values.phone}
                touch={touched.phone}
                errors={errors}
                changeState={setProviderValues}
                state={providerValues}
              />

              {/* Credit day */}
              <CustomInput
                label='Días de credito'
                name='creditDay'
                placeholder='11'
                value={values.creditDay}
                touch={touched.creditDay}
                errors={errors}
                changeState={setProviderValues}
                state={providerValues}
              />

              {message && (
                <div
                  className={`message ${message.error ? 'message-error' : 'message-success'
                    }`}
                >
                  {message.message}
                </div>
              )}

              <div className='form__buttons--group'>
                <button
                  type='submit'
                  className='btn form__submit'
                >
                  Guardar
                </button>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='btn form__cancel'
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    ,
    <div className='container container--tabs'>
      {/* Company */}
      <CustomInput
        label='Compañia'
        name='company'
        placeholder='11'
        type='select'
        arrayToSelect={companies}
        changeStateSelected={handleSelectedCompany}
        value={selectedCompany.id}
      />
      <div className='badges'
      >
        {
          providerValues.companies && (
            providerValues.companies.map(company => (
              <span key={company.id} className='badge'>
                <span className='badge__name'>
                  {company.name}
                </span>
                <span
                  onClick={() => handleRemoveCompany(company)}
                  className='btn__action btn__action-delete'>
                  <BiTrash />
                </span>
              </span>
            )
            )
          )
        }
      </div>
    </div>
  ]

  return (
    <>
      <Tabs
        content={content}
        titles={titles} />
    </>
  )
}

export default ProviderForm

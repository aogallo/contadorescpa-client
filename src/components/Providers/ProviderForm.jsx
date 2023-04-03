import CustomInput from 'components/CustomInput/CustomInput'
import { Form, Formik } from 'formik'
import useCustomContext from 'hooks/useCustomContext'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { formatterData, initialProviderData } from './utils/formatterData'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_PROVIDER, UPDATE_PROVIDER } from 'graphql/Provider/mutations'
import { GET_ALL_PROVIDERS, GET_PROVIDER_BY_ID } from 'graphql/Provider/queries'

const ProviderForm = () => {
  const navigate = useNavigate()
  const [providerValues, setProviderValues] = useState(initialProviderData)
  const params = useParams()
  const [updateProvider] = useMutation(UPDATE_PROVIDER)
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')
  const { company, saveCompany } = useCustomContext()
  const [createProvider] = useMutation(CREATE_PROVIDER)
  const [getProviderById, { data }] = useLazyQuery(GET_PROVIDER_BY_ID)

  useEffect(() => {
    if (data) {
      setProviderValues(formatterData(data))
    }
  }, [data])

  useEffect(() => {
    if (!company.name) navigate('/')

    if (params.id) {
      setIsEditing(true)
      getProviderById({ variables: { id: params.id } })
    }
  }, [])

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

    if (values.email & (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    )) {
      errors.email = 'El correo ingresado es invalido'
    }

    return errors
  }

  const handleCreateProvider = async (values, { resetForm }) => {
    console.log('submit', values)
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

  return (
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
  )
}

export default ProviderForm

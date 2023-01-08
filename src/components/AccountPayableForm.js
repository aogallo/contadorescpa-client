import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_ALL_DOCUMENT_TYPES } from '../graphql/DocumentType/queries'
import { GET_ALL_ACCOUNTS } from '../graphql/Account/queries'
import {
  CREATE_ACCOUNT_PAYABLE,
  UPDATE_ACCOUNT_PAYABLE
} from '../graphql/AccountsPayable/muations'
import {
  GET_ACCOUNT_PAYABLE_BY_ID,
  GET_ALL_ACCOUNTS_PAYABLE
} from '../graphql/AccountsPayable/queries'

import 'components/AccountPayableForm/AccountPayableForm.css'
import { Form, Formik } from 'formik'
import CustomInput from './CustomInput/CustomInput'
import CustomDatePicker from './CustomDatePicker/CustomDatePicker'
import useCustomContext from 'hooks/useCustomContext'
import { calculateTotal } from 'utils/calculateValues'
import {
  formattedAccountPayableForState,
  formattedDateToSave,
  initialDataAccountPayable
} from './AccountPayableForm/utils/formatterData'

const AccountPayableForm = () => {
  const { company } = useCustomContext()
  const navigate = useNavigate()
  const params = useParams()
  const { data: docs } = useQuery(GET_ALL_DOCUMENT_TYPES)
  const { data: accountsData } = useQuery(GET_ALL_ACCOUNTS)
  const [getAccountPayableById, { data: accountPayableById }] = useLazyQuery(
    GET_ACCOUNT_PAYABLE_BY_ID
  )
  const [createAccountPayable] = useMutation(CREATE_ACCOUNT_PAYABLE)
  const [updateAccountPayable] = useMutation(UPDATE_ACCOUNT_PAYABLE)
  const [message, setMessage] = useState(null)
  const [documentTypes, setDocumentTypes] = useState([{ id: "0", name: 'Seleccionar un tipo de documento' }])
  const [isEditing, setIsEditing] = useState(false)
  const [accounts, setAccounts] = useState([{ id: "0", name: 'Seleccionar cuenta' }])
  const [accountPayableInitialValues, setAccountPayableInitialValues] = useState(initialDataAccountPayable)

  useEffect(() => {
    if (params.id) {
      setIsEditing(true)
      getAccountPayableById({ variables: { id: params.id } })
    }
  }, [])

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      total: calculateTotal(accountPayableInitialValues)
    })
  }, [
    accountPayableInitialValues.exento,
    accountPayableInitialValues.importation,
    accountPayableInitialValues.service,
    accountPayableInitialValues.asset
  ])

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      iva: (accountPayableInitialValues.total / 1.12) * 0.12
    })
  }, [accountPayableInitialValues.total])

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      subtotal:
        accountPayableInitialValues.total - accountPayableInitialValues.iva
    })
  }, [accountPayableInitialValues.iva])

  useEffect(() => {
    if (docs) setDocumentTypes((prevState) => prevState.concat(docs.getAllDocumentTypes))
  }, [docs])

  useEffect(() => {
    if (accountsData) {
      setAccounts((prevState) => prevState.concat(accountsData.getAllAccounts))
    }
  }, [accountsData])

  useEffect(() => {
    if (accountPayableById) {
      setAccountPayableInitialValues(formattedAccountPayableForState(accountPayableById))
    }
  }, [accountPayableById])

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const validateFields = (values) => {
    try {
      const errors = {}
      if (!values.serie) errors.serie = 'La serie es requerida.'

      if (!values.documentNumber) {
        errors.documentNumber = 'El número de documento es requerido.'
      }

      return errors
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChangeSelect = ({ value }, name) => {
    setAccountPayableInitialValues({ ...accountPayableInitialValues, [name]: value })
  }

  const handleCreateAccountPayable = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        // EDIT
        await updateAccountPayable({
          variables: {
            accountPayable: formattedDateToSave(values)
          },
          refetchQueries: [{ query: GET_ALL_ACCOUNTS_PAYABLE }]
        })
      } else {
        // ADD
        await createAccountPayable({
          variables: {
            accountPayable: formattedDateToSave(values)
          },
          refetchQueries: [{ query: GET_ALL_ACCOUNTS_PAYABLE }]
        })
      }

      setMessage({
        error: false,
        message: `Cuenta por pagar ${isEditing ? 'actualizada' : 'creada'} correctamente`
      })
      setTimeout(() => {
        setMessage(null)
        navigate(-1)
        resetForm()
      }, 1500)
    } catch (error) {
      setMessage({
        error: true,
        message: error.message
      })
    }
  }

  const handleValidate = (values) => {
    const errors = {}

    return errors
  }

  return (
    <div className='container'>
      <div>
        <Formik
          enableReinitialize
          initialValues={accountPayableInitialValues}
          validate={handleValidate}
          onSubmit={handleCreateAccountPayable}
        >
          {({ values, errors, touched }) => {
            return (
              <Form>
                <div className='form__grid--row'>
                  {/* Document Date*/}
                  <CustomInput
                    changeState={setAccountPayableInitialValues}
                    errors={errors}
                    label='Serie'
                    name='serie'
                    placeholder='Ingresar el número de serie'
                    state={accountPayableInitialValues}
                    touch={touched.serie}
                    type='text'
                    value={values.serie}
                  />

                  {/* Document Number*/}
                  <CustomInput
                    changeState={setAccountPayableInitialValues}
                    errors={errors}
                    label='Documento de documento'
                    name='documentNumber'
                    placeholder='Ingresar el número de documento'
                    state={accountPayableInitialValues}
                    touch={touched.documentNumber}
                    type='text'
                    value={values.documentNumber}
                  />
                </div>

                <div className='form__grid--row'>
                  {/* Document Type*/}
                  <CustomInput
                    arrayToSelect={documentTypes}
                    changeStateSelected={handleOnChangeSelect}
                    errors={errors}
                    label='Tipo de documento'
                    name='idDocumentType'
                    placeholder='Seleccionar tipo'
                    state={accountPayableInitialValues}
                    touch={touched.idDocumentType}
                    type='select'
                    value={values.idDocumentType}
                  />

                  {/* Document Date*/}
                  <CustomDatePicker
                    changeDate={setAccountPayableInitialValues}
                    label='Fecha de documento'
                    name='documentDate'
                    state={accountPayableInitialValues}
                    value={values.documentDate}
                  />
                </div>

                <div className='form__grid--row'>
                  {/* Provider */}
                  <CustomInput
                    arrayToSelect={company.providers}
                    changeStateSelected={handleOnChangeSelect}
                    errors={errors}
                    label='Proveedor'
                    name='idProviderCompany'
                    placeholder='Seleccionar proveedor'
                    state={accountPayableInitialValues}
                    touch={touched.idProviderCompany}
                    type='select'
                    value={values.idProviderCompany}
                  />

                  {/* Account */}
                  <CustomInput
                    arrayToSelect={accounts}
                    changeStateSelected={handleOnChangeSelect}
                    errors={errors}
                    label='Cuenta'
                    name='idAccount'
                    placeholder='Seleccionar cuenta'
                    state={accountPayableInitialValues}
                    touch={touched.idAccount}
                    type='select'
                    value={values.idAccount}
                  />
                </div>

                <div className='form__grid--row'>
                  {/* Exento */}
                  <CustomInput
                    changeState={setAccountPayableInitialValues}
                    errors={errors}
                    label='Exento'
                    name='exento'
                    placeholder='0.00'
                    state={accountPayableInitialValues}
                    touch={touched.exento}
                    type='number'
                    value={values.exento}
                  />

                  {/* Import */}
                  <CustomInput
                    changeState={setAccountPayableInitialValues}
                    errors={errors}
                    label='Importación'
                    name='importation'
                    placeholder='0.00'
                    state={accountPayableInitialValues}
                    touch={touched.importation}
                    type='number'
                    value={values.importation}
                  />
                </div>

                <div className='form__grid--row'>
                  {/* Service */}
                  <CustomInput
                    changeState={setAccountPayableInitialValues}
                    errors={errors}
                    label='Servicio'
                    name='service'
                    placeholder='0.00'
                    state={accountPayableInitialValues}
                    touch={touched.service}
                    type='number'
                    value={values.service}
                  />

                  {/* Assets (bienes) */}
                  <CustomInput
                    changeState={setAccountPayableInitialValues}
                    errors={errors}
                    label='Bienes'
                    name='asset'
                    placeholder='0.00'
                    state={accountPayableInitialValues}
                    touch={touched.asset}
                    type='number'
                    value={values.asset}
                  />
                </div>

                <div className='form__totals'>
                  {/* IVA */}
                  <div className='form__group--total'>
                    <label htmlFor='iva' className='form__label'>IVA:</label>
                    <span name='iva' className='form__label'>{values.iva}</span>
                  </div>

                  {/* Sub-total */}
                  <div className='form__group--total'>
                    <label htmlFor='subtotal' className='form__label'>Sub-total:</label>
                    <span name='subtotal' className='form__label'>{values.subtotal}</span>
                  </div>

                  {/* Total */}
                  <div className='form__group--total'>
                    <label htmlFor='total' className='form__label'>Total:</label>
                    <span name='total' className='form__label'>{values.total}</span>
                  </div>
                </div>

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
              </Form>
            )
          }
          }
        </Formik>
      </div>
    </div>
  )
}

export default AccountPayableForm

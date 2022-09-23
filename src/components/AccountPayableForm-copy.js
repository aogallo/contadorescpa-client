import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_ALL_DOCUMENT_TYPES } from '../graphql/DocumentType/queries'
import { GET_ALL_PROVIDERS } from '../graphql/Provider/queries'
import { GET_ALL_ACCOUNTS } from '../graphql/Account/queries'
import {
  CREATE_ACCOUNT_PAYABLE,
  UPDATE_ACCOUNT_PAYABLE
} from '../graphql/AccountsPayable/muations'
import {
  GET_ACCOUNT_PAYABLE_BY_ID,
  GET_ALL_ACCOUNTS_PAYABLE
} from '../graphql/AccountsPayable/queries'

import Message from 'components/Message'

const AccountPayableForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: docs } = useQuery(GET_ALL_DOCUMENT_TYPES)
  const { data: providersData } = useQuery(GET_ALL_PROVIDERS)
  const { data: accountsData } = useQuery(GET_ALL_ACCOUNTS)
  const [getAccountPayableById, { data: accountPayableById }] = useLazyQuery(
    GET_ACCOUNT_PAYABLE_BY_ID
  )
  const [message, setMessage] = useState(null)
  const [createAccountPayable] = useMutation(CREATE_ACCOUNT_PAYABLE)
  const [updateAccountPayable] = useMutation(UPDATE_ACCOUNT_PAYABLE)
  const [documentTypes, setDocumentTypes] = useState([])
  const [providers, setProviders] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [accountPayableInitialValues, setAccountPayableInitialValues] =
    useState({
      id: 0,
      idDocumentType: '',
      idProvider: '',
      idAccount: '',
      serie: '',
      documentNumber: '',
      documentDate: '',
      exento: 0,
      importation: 0,
      service: 0,
      asset: 0,
      subtotal: 0,
      iva: 0,
      total: 0
    })

  useEffect(() => {
    if (params.id) {
      setIsEditing(true)
      getAccountPayableById({ variables: { id: params.id } })
    }

  }, [])

  useEffect(() => {
    if (docs) {
      setDocumentTypes(docs.getAllDocumentTypes)
    }
  }, [docs])

  useEffect(() => {
    if (providersData) {
      setDocumentTypes(providersData.getAllProviders)
    }
  }, [providersData])

  useEffect(() => {
    if (accountsData) {
      setDocumentTypes(accountsData.getAllAccounts)
    }
  }, [accountsData])

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      total:
        parseFloat(accountPayableInitialValues.exento) +
        parseFloat(accountPayableInitialValues.importation) +
        parseFloat(accountPayableInitialValues.service) +
        parseFloat(accountPayableInitialValues.asset)
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
      iva: accountPayableInitialValues.total * 0.12
    })
  }, [accountPayableInitialValues.total])

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      subtotal:
        accountPayableInitialValues.total - accountPayableInitialValues.iva
    })
  }, [accountPayableInitialValues.iva])

  const handleChangeService = ({ target }) => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      service: parseFloat(target.value) || 0
    })
  }

  const handleChangeAsset = ({ target }) => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      asset: parseFloat(target.value) || 0
    })
  }

  const handleChangeExento = ({ target }) => {
    setAccountPayableInitialValues((prevState) => {
      return {
        ...accountPayableInitialValues,
        exento: parseFloat(target.value) || 0
      }
    })
  }

  const handleChangeImportation = ({ target }) => {
    setAccountPayableInitialValues((prevState) => {
      console.log('importacion prevState', prevState)
      return {
        ...prevState,
        importation: parseFloat(target.value) || 0
      }
    })
  }

  useEffect(() => {
    if (accountPayableById) {
      const documentDate = new Date(
        accountPayableById.getAccountPayableById.documentDate
      )
      setAccountPayableInitialValues({
        id: accountPayableById.getAccountPayableById.id,
        idDocumentType:
          accountPayableById.getAccountPayableById.documentType.id,
        idProvider: `${accountPayableById.getAccountPayableById.proveedor.id} - ${accountPayableById.getAccountPayableById.proveedor.name}`,
        idAccount: `${accountPayableById.getAccountPayableById.account.accountNumber} - ${accountPayableById.getAccountPayableById.account.name}`,
        serie: accountPayableById.getAccountPayableById.serie,
        documentNumber: accountPayableById.getAccountPayableById.documentNumber,
        documentDate: `${documentDate.getFullYear()}-${String(
          documentDate.getMonth() + 1
        ).padStart(2, 0)}-${String(documentDate.getDate()).padStart(2, 0)}`,
        exento: accountPayableById.getAccountPayableById.exento,
        importation: accountPayableById.getAccountPayableById.importation,
        service: accountPayableById.getAccountPayableById.service,
        asset: accountPayableById.getAccountPayableById.asset,
        subtotal: accountPayableById.getAccountPayableById.subtotal,
        iva: accountPayableById.getAccountPayableById.iva,
        total: accountPayableById.getAccountPayableById.total
      })
    }
  }, [accountPayableById])

  useEffect(() => {
    if (docs) setDocumentTypes(docs.getAllDocumentTypes)
    if (providersData) setProviders(providersData.getAllProviders)
    if (accountsData) setAccounts(accountsData.getAllAccounts)
  }, [docs, providersData, accountsData])

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

  const getIdAccount = (accountNumber) => {
    const account = accounts.filter(
      (account) => account.accountNumber === accountNumber
    )
    return account[0].id
  }

  const handleCreateAccountPayable = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        // EDIT
        await updateAccountPayable({
          variables: {
            accountPayable: {
              id: values.id,
              idDocumentType: values.idDocumentType,
              idProvider: values.idProvider.split('-')[0].trim(),
              idAccount: getIdAccount(values.idAccount.split('-')[0].trim()),
              serie: values.serie,
              documentNumber: values.documentNumber,
              documentDate: values.documentDate,
              exento: values.exento.toString(),
              importation: values.importation.toString(),
              service: values.service.toString(),
              asset: values.asset.toString(),
              subtotal: values.subtotal.toString(),
              iva: values.iva.toString(),
              total: values.total.toString()
            }
          },
          refetchQueries: [{ query: GET_ALL_ACCOUNTS_PAYABLE }]
        })
      } else {
        // ADD
        await createAccountPayable({
          variables: {
            accountPayable: {
              id: 0,
              idDocumentType: values.idDocumentType,
              idProvider: values.idProvider.split('-')[0].trim(),
              idAccount: getIdAccount(values.idAccount.split('-')[0].trim()),
              serie: values.serie,
              documentNumber: values.documentNumber,
              documentDate: values.documentDate,
              exento: values.exento.toString(),
              importation: values.importation.toString(),
              service: values.service.toString(),
              asset: values.asset.toString(),
              subtotal: values.subtotal.toString(),
              iva: values.iva.toString(),
              total: values.total.toString()
            }
          },
          refetchQueries: [{ query: GET_ALL_ACCOUNTS_PAYABLE }]
        })
      }

      setMessage({
        error: false,
        message: `Cuenta por pagar ${isEditing ? 'actualizada' : 'creada'
          } correctamente`
      })
      setTimeout(() => {
        setMessage(null)
        navigate(-1)
        resetForm()
      }, 1500)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='form-container'>
      <div className='form-header'>
        <button onClick={handleCancel} className=''>
          <i className='fas fa-arrow-left' />
        </button>
        {isEditing ? 'Editar' : 'Agregar'} cuenta por pagar
      </div>
      <div className='form-content'>
        <form onSubmit={handleCreateAccountPayable}>
          {/* Serie */}
          <div className='form-control-container'>
            <label htmlFor='serie' className=''>
              Serie
            </label>
            <input
              id='serie'
              type='text'
              name='serie'
              onChange={handleChange}
              value={values.serie}
              className='form-control'
              placeholder='Serie'
            />
            <i className='fas fa-times-circle'></i>
            {/*
              label
              div
                input
                icono

              */}
          </div>
          {
            touched.serie && errors.serie && <Message message={errors.serie} />
          }

          {/* Document Number */}
          <div className='form-control-container'>
            <label htmlFor='serie' className=''>
              Número
            </label>

            <input
              id='documentNumber'
              name='documentNumber'
              type='text'
              placeholder='Número del documento'
              className='form-control'
              onChange={handleChange}
              value={values.documentNumber}
            />
          </div>
          {
            touched.documentNumber && errors.documentNumber && <Message message={errors.documentNumber} />
          }

          {/* Tipo */}
          <div className='form-control-container'>
            <label htmlFor='idDocumentType' className='' >
              Tipo de documento
            </label>
            <select
              name='idDocumentType'
              id='idDocumentType'
              onChange={handleChange}
              placeholder='Tipo de documento'
              value={values.idDocumentType}>
              {
                documentTypes &&
                documentTypes.map((document) => <option key={document.id} value={document.id}>{document.name}</option>)
              }

            </select>
          </div>
          {
            touched.idDocumentType && errors.idDocumentType && <Message message={errors.idDocumentType} />
          }

          {/* Document Date */}
          <div className='form-control-container' >
            <label htmlFor='documentDate' className='' >
              Fecha
            </label>
            <input
              type='date'
              id='documentDate'
              name='documentDate'
              className='form-control'
              onChange={handleChange}
              value={values.documentDate}
            />
          </div>
          {
            touched.documentDate && errors.documentDate && <Message message={errors.documentDate} />
          }

          {/* Provider */}
          <div className='form-control-container'>
            <label htmlFor='provider' className=''>
              Proveedor
            </label>
            <input
              className=''
              list='providerList'
              id='idProvider'
              type='text'
              name='idProvider'
              value={values.idProvider}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Buscar proveedor...'
            />
            <datalist id='providerList'>
              {providers &&
                providers.map((provider) => (
                  <option
                    value={`${provider.id} - ${provider.name}`}
                    key={provider.id}
                  />
                ))}
            </datalist>
          </div>
          {
            touched.idProvider && errors.idProvider && <Message message={errors.idProvider} />
          }

          <div className='form-control-container-four-columns'>
            {/* Exento */}
            <label htmlFor='exento' className=''>
              Exento
            </label>
            <input
              onChange={handleChangeExento}
              value={values.exento}
              type='number'
              id='exento'
              name='exento'
              min='0'
              className='form-control'
            />

            {/* Import */}
            <label htmlFor='importation' className='label-two' >
              Importación
            </label>
            <input
              type='number'
              value={values.importation}
              onChange={handleChangeImportation}
              id='importation'
              name='importation'
              className='form-control'
            />
          </div>

          <div className='form-control-container-four-columns'>
            {/* Service */}
            <label htmlFor='service' className=''>
              Servicio
            </label>
            <input
              value={values.service}
              onChange={handleChangeService}
              type='number'
              id='service'
              name='service'
              className='form-control'
            />

            {/* Assets (bienes) */}
            <label htmlFor='assets' className='label-two'>
              Bienes
            </label>

            <input
              value={values.asset}
              onChange={handleChangeAsset}
              type='number'
              id='asset'
              name='asset'
              className='form-control'
            />
          </div>

          {/* Account */}
          <div className='form-control-container'>
            <label htmlFor='account' className=''>
              Cuenta
            </label>
            <input
              className='form-control'
              list='accountList'
              id='idAccount'
              name='idAccount'
              value={values.idAccount}
              onChange={handleChange}
              onBlur={handleBlur}
              type='text'
              placeholder='Seleccionar cuenta...'
            />
            <datalist id='accountList'>
              {accounts &&
                accounts.map((account) => (
                  <option
                    key={account.id}
                    value={`${account.accountNumber} - ${account.name}`}
                  />
                ))}
            </datalist>
          </div>
          {
            touched.idAccount && errors.idAccount && <Message message={errors.idAccount} />
          }

          {/* Sub-total */}
          <div className='form-control-container'>
            <label htmlFor='sub_total' className=''>
              Sub-total
            </label>
            <input
              type='text'
              readOnly
              id='subtotal'
              name='subtotal'
              onChange={handleChange}
              className='form-control'
              disabled
            />
          </div>
          {
            touched.subtotal && errors.subtotal && <Message message={errors.subtotal} />
          }

          {/* IVA */}
          <div className='form-control-container'>
            <label htmlFor='iva' className=''>
              IVA
            </label>
            <input
              type='text'
              readOnly
              id='iva'
              name='iva'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          {
            touched.iva && errors.iva && <Message message={errors.iva} />
          }

          {/* TOTAL */}
          <div className='form-control-container'>
            <label htmlFor='total' className='col-sm-2 form-label'>
              Total
            </label>
            <input
              type='text'
              readOnly
              id='total'
              name='total'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          {
            touched.total && errors.total && <Message message={errors.total} />
          }

          {/* Message */}
          {message && (
            <div
              className={`message ${message.error ? 'message-error' : 'message-success'
                }`}
            >
              {message.message}
            </div>
          )}

          <div className='form-actions'>
            <button type='submit' className='btn-save'>
              Guardar
            </button>
            <button
              type='button'
              className='btn-cancel'
              onClick={(e) => handleCancel(e)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default AccountPayableForm

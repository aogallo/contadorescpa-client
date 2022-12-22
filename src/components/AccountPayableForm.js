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

import 'components/AccountPayableForm/AccountPayableForm.css'
import Message from 'components/Message/Message'
import { Form, Formik } from 'formik'
import CustomInput from './CustomInput/CustomInput'
import CustomDatePicker from './CustomDatePicker/CustomDatePicker'

const AccountPayableForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: docs } = useQuery(GET_ALL_DOCUMENT_TYPES)
  const { data: providersData } = useQuery(GET_ALL_PROVIDERS)
  const { data: accountsData } = useQuery(GET_ALL_ACCOUNTS)
  const [getAccountPayableById, { data: accountPayableById }] = useLazyQuery(
    GET_ACCOUNT_PAYABLE_BY_ID
  )
  const [fecha, setFecha] = useState(new Date())
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
      documentDate: new Date(),
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
      return {
        ...prevState,
        importation: parseFloat(target.value) || 0
      }
    })
  }

  useEffect(() => {
    if (accountPayableById) {
      const [day, month, year] = accountPayableById.getAccountPayableById.documentDate.split('/')

      const documentDate = new Date(year, month - 1, day)
      console.log('documentDate', typeof documentDate)
      // console.log(accountPayableById.getAccountPayableById.documentDate.split('/'))
      // console.log('documentDate date', documentDate.toISOString())
      // console.log('documentDate year ', documentDate.getFullYear())
      // console.log('documentDate moth', documentDate.getMonth())
      // console.log('documentDate day', documentDate.getDate())
      setAccountPayableInitialValues({
        id: accountPayableById.getAccountPayableById.id,
        idDocumentType:
          accountPayableById.getAccountPayableById.documentType.id,
        idProvider: `${accountPayableById.getAccountPayableById.provider.id} - ${accountPayableById.getAccountPayableById.provider.name}`,
        idAccount: `${accountPayableById.getAccountPayableById.account.accountNumber} - ${accountPayableById.getAccountPayableById.account.name}`,
        serie: accountPayableById.getAccountPayableById.serie,
        documentNumber: accountPayableById.getAccountPayableById.documentNumber,
        // documentDate: `${documentDate.getFullYear()}-${String(
        //   documentDate.getDate()
        // ).padStart(2, 0)}-${String(documentDate.getMonth()).padStart(2, 0)}`,
        // documentDate: `${year}-${day}-${month}`,
        documentDate: documentDate,
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
          {({ values, errors, touched }) => (
            <Form>
              {/* Document Type*/}
              <CustomInput
                changeStateSelected={() => console.log('test')}
                errors={errors}
                label='Tipo de documento'
                name='idDocumentType'
                value={values.idDocumentType}
                arrayToSelect={documentTypes}
                type='select'
                placeholder='Seleccionar tipo'
                touch={touched.idDocumentType}
                state={accountPayableInitialValues}
              />
              {/* Document Date*/}
              <CustomDatePicker
                label='Fecha de documento'
                value={values.documentDate}
                name='documentDate'
                changeDate={setAccountPayableInitialValues}
                state={accountPayableInitialValues}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AccountPayableForm

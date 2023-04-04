import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import useCustomContext from 'hooks/useCustomContext'

import { GET_ACCOUNTS_PAYABLE_BY_ID_COMPANY } from '../graphql/AccountsPayable/queries'
import { formatterDataToTable } from './AccountPayableForm/utils/formatterData'

import Table from 'components/Table'

const columns = [
  { column: 'Serie', key: 'serie' },
  { column: 'Numero', key: 'documentNumber' },
  { column: 'Fecha', key: 'documentDate' },
  { column: 'Tipo de documento', key: 'documentTypeName' },
  { column: 'Proveedor', key: 'providerName' },
  { column: 'Cuenta', key: 'accountName' },
  { column: 'Acciones', key: 'actions' }
]

const AccountPayableList = () => {
  const { company } = useCustomContext()
  const { data } = useQuery(GET_ACCOUNTS_PAYABLE_BY_ID_COMPANY,
    {
      variables: {
        id: company.id
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only'
    })
  const [accountsPayable, setAccountsPayable] = useState([])

  useEffect(() => {
    if (data) {
      setAccountsPayable(formatterDataToTable(data))
    }
  }, [data])

  return (
    <>
      <Table
        columns={columns}
        data={accountsPayable}
        editRoute='edit/'
      />
    </>
  )
}

export default AccountPayableList

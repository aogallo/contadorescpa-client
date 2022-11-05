import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_ACCOUNTS_PAYABLE } from '../graphql/AccountsPayable/queries'
import { Link, NavLink } from 'react-router-dom'
import Table from 'components/Table'

const columns = [
  { column: 'Serie', key: 'serie' },
  { column: 'Numero', key: 'documentNumber' },
  { column: 'Fecha', 'key': 'documentDate' },
  { column: 'Tipo de documento', 'key': 'documentTypeName' },
  { column: 'Proveedor', 'key': 'providerName' },
  { column: 'Cuenta', 'key': 'accountName' },
  { column: 'Acciones', key: 'actions' }
]

const AccountPayableList = ({ title }) => {
  const { loading, data } = useQuery(GET_ALL_ACCOUNTS_PAYABLE)
  const [accountsPayable, setAccountsPayable] = useState([])

  useEffect(() => {
    if (data) {
      const newAccountsPayableData = data.getAllAccountPayable.map(accountPayable => {
        const {
          account: {
            id: idAccount,
            name: accountName
          },
          provider: {
            id: idProvider,
            name: providerName
          },
          documentType: {
            name: documentTypeName
          }
        } = accountPayable
        return {
          ...accountPayable,
          idAccount,
          accountName,
          idProvider,
          providerName,
          documentTypeName
        }
      })
      setAccountsPayable(newAccountsPayableData)
    }
  }, [data])

  return (
    <>
      <div className='form-header'>
        <section>
          <i className='fas fa-table me-1' />
          {title}
        </section>
        <Link className='' to='/cxp/add'>
          Agregar
        </Link>
        <Table columns={columns} data={accountsPayable} />
      </div>
    </>
  )
}

export default AccountPayableList

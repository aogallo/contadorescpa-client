import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS_PAYABLE_BY_ID_COMPANY } from '../graphql/AccountsPayable/queries'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
import useCustomContext from 'hooks/useCustomContext'
import { formatterDataToTable } from './AccountPayableForm/utils/formatterData'
import CreateFile from './CreateFile/CreateFile'

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
  const { company } = useCustomContext()
  const { loading, data } = useQuery(GET_ACCOUNTS_PAYABLE_BY_ID_COMPANY,
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
      <div className='form-header'>
        <section>
          <i className='fas fa-table me-1' />
          {title}
        </section>
        <Link className='' to='/cxp/add'>
          Agregar
        </Link>
        <CreateFile
          filename={`Facturas, ${company.name}.csv`} />
        <Table
          columns={columns}
          data={accountsPayable}
          editRoute='edit/'
        />
      </div>
    </>
  )
}

export default AccountPayableList

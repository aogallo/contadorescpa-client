import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import Title from 'components/Title'
import Table from 'components/Table'

const columns = [
  { column: 'Nombre', key: 'name' },
  { column: 'Nit', key: 'nit' },
  { column: 'Fecha de creación', key: 'dateBirth' },
  { column: 'Acciones', key: 'actions' }
]

const Company = () => {
  const { data } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  })
  const [companies, setCompanies] = useState([])
  const [breadCrumb] = useState([
    {
      name: 'Inicio',
      path: '/',
      active: false
    }
  ])

  const groupButtons = [
    {
      name: 'Agregar Compañia',
      path: '/company/add',
      class: 'title__button--blue'
    }
  ]

  useEffect(() => {
    if (data) {
      setCompanies(data.getAllCompanies)
    }
  }, [data])

  return (
    <>
      <Title title='Compañias' breadCrumb={breadCrumb} groupButtons={groupButtons} />
      <Table columns={columns} data={companies} editRoute='/company/edit/' />
    </>
  )
}

export default Company

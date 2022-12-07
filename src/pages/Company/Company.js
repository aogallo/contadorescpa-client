import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import { AppContext } from 'context/AppContext'
import Title from 'components/Title'
import { useNavigate } from 'react-router-dom'
import Table from 'components/Table'

const columns = [
  { column: 'Nombre', key: 'name' },
  { column: 'Nit', key: 'nit' },
  { column: 'Fecha de creación', 'key': 'dateBirth' },
  { column: 'Acciones', key: 'actions' }
]

const Company = () => {
  const { data } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  })
  const navigate = useNavigate()
  const { saveCompany } = useContext(AppContext)
  const [companies, setCompanies] = useState([])
  const [filterCompanies, setFilterCompanies] = useState([])
  const [search, setSearch] = useState('')
  const [breadCrumb, setBreadCrumb] = useState([
    {
      name: 'Inicio',
      path: '/',
      active: false
    }
  ])

  useEffect(() => {
    if (data) {
      setCompanies(data.getAllCompanies)
      setFilterCompanies(data.getAllCompanies)
      setBreadCrumb('')
    }
  }, [data])

  const handleSearch = ({ target }) => {
    setSearch(target.value)
    filterTerm(target.value)
  }

  const filterTerm = (term) => {
    const result = filterCompanies.filter((compay) => {
      if (
        compay.name
          .toString()
          .toLowerCase()
          .includes(term.toLocaleLowerCase())
      ) {
        return compay
      }
    })

    setCompanies(result)
  }

  const handleSelectCompany = (company) => {
    saveCompany({
      id: company.id,
      name: company.name
    })
    // navigate('/home')
  }

  return (
    <div className=''>
      <Title title='Compañias' breadCrumb={breadCrumb} />

      <div className='form-header'>
        <div className=''>
          <span className='' id=''>
            <i className='fas fa-search' />
          </span>
        </div>
        <input
          type='text'
          className=''
          name='search'
          placeholder='Buscar compañia'
          onChange={handleSearch}
          value={search}
        />
      </div>

      <Table columns={columns} data={companies} editRoute='/company/edit/' />

    </div>
  )
}

export default Company


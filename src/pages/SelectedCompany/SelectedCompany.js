import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import { AppContext } from 'context/AppContext'
import Title from 'components/Title'
import { useNavigate } from 'react-router-dom'

const SelectedCompany = () => {
  const { data } = useQuery(GET_ALL_COMPANIES)
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
    navigate('/')
  }

  return (
    <div className='company__container'>
      <Title title='Compañias' breadCrumb={breadCrumb} />
      <div className='search__container'>
        <i className='search__icon fas fa-search' />
        <input
          type='text'
          className='search__input'
          name='search'
          placeholder='Buscar compañia'
          onChange={handleSearch}
          value={search}
        />
      </div>

      {companies && (
        <div className='card__container'>
          {companies.map((company) => (
            <div
              key={company.id}
              className=''
              onClick={() => handleSelectCompany(company)}
            >
              <div className='card'>
                <div className='card__title'>{company.name}</div>
                <div className='card__body'>
                  <label className='card__label'>
                    NIT: <span className='card__text'>{company.nit}</span>
                  </label>
                  <label className='card__label'>
                    Actividad comercial: <span className='card__text'>{company.comercialActivity}</span>
                  </label>
                  <label className='card__label'>Fecha: <span className='card__text'>{company.dateBirth}</span></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectedCompany

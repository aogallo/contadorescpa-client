import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import Title from 'components/Title'
import { useNavigate } from 'react-router-dom'
import useCustomContext from 'hooks/useCustomContext'
import { isTokenExpired } from 'utils/token'
import Loading from 'components/Loading/Loading'

const SelectedCompany = () => {
  const { data } = useQuery(GET_ALL_COMPANIES)
  const navigate = useNavigate()
  const { company, saveCompany, user } = useCustomContext()
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
  const logged = isTokenExpired(user.token)

  useEffect(() => {
    if (!logged) {
      navigate('/login')
    }

    if (company?.id) {
      navigate('/')
    }

  }, [logged])

  useEffect(() => {
    if (data) {
      setCompanies(data.getAllCompanies)
      setFilterCompanies(data.getAllCompanies)
      setBreadCrumb('')
      if (process.env.NODE_ENV === 'development') {
        console.log(data.getAllCompanies)
        saveCompany(data.getAllCompanies[0])
        navigate('/')
      }
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
    saveCompany(company)
    navigate('/')
  }

  if (!companies) {
    return <Loading />
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

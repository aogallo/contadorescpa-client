import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import useCustomContext from 'hooks/useCustomContext'
import { BiArchive, BiBuilding, BiBuildings, BiUser, BiLogOut } from 'react-icons/bi'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'

const SideBar = () => {
  const { data } = useQuery(GET_ALL_COMPANIES)
  const { company, logout, saveCompany, user } = useCustomContext()
  const [companies, setCompanies] = useState([])
  const handleLogut = () => {
    logout()
  }

  useEffect(() => {
    if (data) {
      setCompanies(data.getAllCompanies)
    }
  }, [data])


  const handleChange = (e) => {
    e.preventDefault()
    const id = e.target.value
    const selectedCompany = companies.filter(company => company.id === id)[0]
    saveCompany(selectedCompany)
  }

  return (
    <aside className='sidebar'>
      <NavLink to='' className="sidebar__title">
        <h2 className=''>Contadores</h2>
      </NavLink>
      <div className='company'>
        <label htmlFor='idCompany' className='company__label'>Compa&ntilde;ia</label>
        <select
          className='company__list'
          name='company'
          id='company'
          onChange={handleChange}
          placeholder='Compañia'
          value={company.id}>
          {
            companies &&
            companies.map((company) =>
              <option className='company__item'
                key={company.id}
                value={company.id}>
                {company.name}
              </option>)
          }
        </select>
      </div>
      <div className='user'>
        <span className='sidebar__link sidebar__link--user'>{user?.username}</span>
      </div>
      <NavLink to='/client' className='sidebar__link'>
        <BiUser />
        <span className='sidebar__subtitle'>Clientes</span>
      </NavLink>
      <NavLink to='/company' className='sidebar__link'>
        <BiBuilding />
        <span className='sidebar__subtitle'>Compa&ntilde;ia</span>
      </NavLink>
      <NavLink to='/provider' className='sidebar__link'>
        <BiUser />
        <span className='sidebar__subtitle'>Proveedores</span>
      </NavLink>
      <NavLink to='/cxp' className='sidebar__link'>
        <BiArchive />
        <span className='sidebar__subtitle'>Facturas</span>
      </NavLink>
      <NavLink to='/selected-company' className='sidebar__link'
        onClick={() => saveCompany({ id: null, name: '' })}>
        <BiBuildings />
        <span className='sidebar__subtitle'>Seleccionar compañia</span>
      </NavLink>
      <a className='sidebar__link' onClick={handleLogut}>
        <BiLogOut />
        <span className='sidebar__subtitle'>Salir</span>
      </a>
    </aside>
  )
}

export default SideBar

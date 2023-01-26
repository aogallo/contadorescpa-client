import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import useCustomContext from 'hooks/useCustomContext'
import { BiArchive, BiBuilding, BiBuildings, BiUser, BiLogOut, BiChevronRight } from 'react-icons/bi'
import { BsChevronRight } from 'react-icons/bs'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'

import menus from 'components/SideBar/menu'
import SidebarMenu from './SideBar/SidebarMenu'

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


  // <NavLink to='/client' className='sidebar__link'>
  //   <BiUser className='icon__left' />
  //   <span className='sidebar__subtitle'>Clientes</span>
  // </NavLink>

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

      {
        menus.map((menu) => <SidebarMenu key={menu.title} menu={menu} />)
      }


      <a
        className='sidebar__link'
        onClick={handleLogut}>
        <div>

          <BiLogOut />
          <span className='sidebar__subtitle'>Salir</span>
        </div>
      </a>
    </aside>
  )
}

export default SideBar

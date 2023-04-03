import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import useCustomContext from 'hooks/useCustomContext'
import { BiLogOut } from 'react-icons/bi'
import { useQuery } from '@apollo/client'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'

import menus from 'components/SideBar/menu'
import SidebarMenu from './SideBar/SidebarMenu'
import CustomInput from './CustomInput/CustomInput'

const SideBar = () => {
  const { data } = useQuery(GET_ALL_COMPANIES)
  const { company, logout, saveCompany, user } = useCustomContext()
  const [companies, setCompanies] = useState([])
  const handleLogut = () => {
    logout()
  }

  const customClassSidebar = {
    control: {
      backgroundColor: '#21232d',
      borderColor: '#9799ab'
    },
    singleValue: {
      color: '#9799ab'
    },
    label: 'sidebar__title'
  }

  useEffect(() => {
    if (data) {
      setCompanies(data.getAllCompanies)
    }
  }, [data])

  const handleChange = (event) => {
    const id = event.value
    const selectedCompany = companies.filter(company => company.id === id)[0]
    saveCompany(selectedCompany)
  }

  return (
    <aside className='sidebar'>
      <NavLink to='' className='sidebar__title'>
        <h2 className=''>Contadores</h2>
      </NavLink>
      <div className='sidebar__subtitle sidebar__select'>
        <CustomInput
          label='Compañia'
          name='company'
          customClass={customClassSidebar}
          placeholder='11'
          type='select'
          arrayToSelect={companies}
          changeStateSelected={handleChange}
          value={company.id}
        />
      </div>
      <div className='user'>
        <span className='sidebar__link sidebar__link--user'>{user?.username}</span>
      </div>

      {
        menus.map((menu) => <SidebarMenu key={menu.title} menu={menu} />)
      }

      <a
        className='sidebar__link'
        onClick={handleLogut}
      >
        <div>

          <BiLogOut />
          <span className='sidebar__subtitle'>Salir</span>
        </div>
      </a>
    </aside>
  )
}

export default SideBar

import React from 'react'
import { NavLink } from 'react-router-dom'

import useCustomContext from 'hooks/useCustomContext'
import { BiArchive, BiBuilding, BiBuildings, BiUser, BiLogOut } from 'react-icons/bi'

const SideBar = () => {
  const { logout, setCompany } = useCustomContext()
  const handleLogut = () => {
    logout()
  }

  return (
    <aside className='sidebar'>
      <NavLink to='' className="sidebar__title">
        <h2 className=''>Contadores</h2>
      </NavLink>
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
      <NavLink to='/selected-company' className='sidebar__link' onClick={() => setCompany('')}>
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

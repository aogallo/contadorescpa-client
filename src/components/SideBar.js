import React from 'react'
import { NavLink } from 'react-router-dom'


import useCustomContext from 'hooks/useCustomContext'
import { BiArchive, BiBuilding, BiUser, BiLogOut } from 'react-icons/bi'

const SideBar = () => {
  const { logout } = useCustomContext()
  const handleLogut = () => {
    logout()
  }

  return (
    <aside className='sidebar'>
      <NavLink to='' className="sidebar__title">
        {/*<img src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg' alt='' />*/}
        <h2 className=''>Contadores</h2>
      </NavLink>
      <NavLink to='/client' className='sidebar__link'>
        {/*<i className="fas fa-solid fa-user sidebar__icon"></i>*/}
        <BiUser />
        <span className='sidebar__subtitle'>Clientes</span>
      </NavLink>
      <NavLink to='/company' className='sidebar__link'>
        {/*<i className="fas fa-solid fa-building sidebar__icon"></i>*/}
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
      <a className='sidebar__link' onClick={handleLogut}>
        <BiLogOut />
        <span className='sidebar__subtitle'>Salir</span>
      </a>
    </aside>
  )
}

export default SideBar

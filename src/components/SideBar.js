import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
// import './SideBar/SideBar.css'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AppContext)
  const handleLogut = () => {
    logout()
  }

  return (
    <aside className='sidebar'>
      <NavLink to='' className="sidebar__header">
    {/*<img src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg' alt='' />*/}
        <h2>Contadores</h2>
      </NavLink>
      <NavLink to='/client' className='sidebar__link'>
        <i className="fas fa-solid fa-user sidebar__link__icon"></i>
        <span>Clientes</span>
      </NavLink>
      <NavLink to='/company' className='sidebar__link'>
        <i className="fas fa-solid fa-building sidebar__link__icon"></i>
        <span>Compa&ntilde;ia</span>
      </NavLink>
      <NavLink to='/provider' className='sidebar__link'>
        <i className="fas fa-solid fa-users sidebar__link__icon"></i>
        <span>Proveedores</span>
      </NavLink>
      <NavLink to='/cxp' className='sidebar__link'>
        <i className="fas fa-solid fa-money-bill sidebar__link__icon"></i>
        <span>Facturas</span>
      </NavLink>
      <a className='sidebar__link' onClick={handleLogut}>
        <i className="fas fa-solid fa-arrow-right-from-bracket sidebar__link__icon"></i>
        <span>Salir</span>
      </a>
    </aside>
  )
}

export default SideBar

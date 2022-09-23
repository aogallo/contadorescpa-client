import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar/SideBar.css'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AppContext)
  const handleLogut = () => {
    logout()
  }

  return (
    <section id="menu">
      <NavLink to='' className="logo">
        <img src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg' alt='' />
        <h2>Contadores</h2>
      </NavLink>
      <nav className='items'>
        <NavLink to='/client' className='sidebar-nav-link'>
          <i className="fas fa-solid fa-user icon-sidebar"></i>
          <span>Clientes</span>
        </NavLink>
        <NavLink to='/company' className='sidebar-nav-link'>
          <i className="fas fa-solid fa-building icon-sidebar"></i>
          <span>Compa&ntilde;ia</span>
        </NavLink>
        <NavLink to='/provider' className='sidebar-nav-link'>
          <i className="fas fa-solid fa-users icon-sidebar"></i>
          <span>Proveedores</span>
        </NavLink>
        <NavLink to='/cxp' className='sidebar-nav-link'>
          <i className="fas fa-solid fa-money-bill icon-sidebar"></i>
          <span>Facturas</span>
        </NavLink>
        <a className='sidebar-nav-link logout' onClick={handleLogut}>
          <i className="fas fa-solid fa-arrow-right-from-bracket icon-sidebar"></i>
          <span>Salir</span>
        </a>
      </nav>
    </section>
  )
}

export default SideBar

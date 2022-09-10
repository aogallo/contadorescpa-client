import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBar = () => {
  return (
    <section id="menu">
      <NavLink to='' className="logo">
        <img src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg' alt='' />
        <h2>Contadores</h2>
      </NavLink>
      <nav className='items'>
        {/*<NavLink to='/about' className='sidebar-nav-link'>
          <FontAwesomeIcon icon='fa-user' className='icon-sidebar'/>
          <span>About</span>
        </NavLink>
        */}
        <NavLink to='/client' className='sidebar-nav-link'>
          <FontAwesomeIcon icon='fa-user' className='icon-sidebar'/>
          <span>Clientes</span>
        </NavLink>
        <NavLink to='/company' className='sidebar-nav-link'>
          <FontAwesomeIcon icon='fa-building' className='icon-sidebar'/>
          <span>Compa&ntilde;ia</span>
        </NavLink>
        <NavLink to='/provider' className='sidebar-nav-link'>
          <FontAwesomeIcon icon='fa-user-secret' className='icon-sidebar'/>
          <span>Proveedores</span>
        </NavLink>
        <NavLink to='/cxp' className='sidebar-nav-link'>
          <FontAwesomeIcon icon='fa-money-bill' className='icon-sidebar'/>
          <span>Facturas</span>
        </NavLink>
      </nav>
    </section>
  )
}

export default SideBar

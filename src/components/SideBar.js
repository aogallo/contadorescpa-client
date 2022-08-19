import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBar = () => {
  return (
    <section id="menu">
      <div className="logo">
        <img src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg' alt='' />
        <h2>Contadores</h2>
      </div>
      <div className='items'>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
        <li><i><FontAwesomeIcon icon='fa-user-secret'/></i><a hrfe='#'>Dashboard</a></li>
      </div>
    </section>
  )
}

export default SideBar

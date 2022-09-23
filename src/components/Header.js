import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { types } from '../types/types'

import 'components/Header/Header.css'

const Header = () => {
  const { dispatch } = useContext(AppContext)
  const { user } = useContext(AppContext)

  const handleLogout = () => {
    dispatch({
      type: types.logout
    })
  }

  return (
    <div className='navigation'>
      <div className='search-container'>
        <div className='search'>
          <input type='text' placeholder='Buscar' />
        </div>
      </div>
      <div className='profile'>
        <span>|</span>
        <h3>{user?.username}</h3>
        <img src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg' />
      </div>
    </div>
  )
}

export default Header

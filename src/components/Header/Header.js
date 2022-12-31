import React from 'react'

import useCustomContext from 'hooks/useCustomContext'

import 'components/Header/Header.css'

const Header = () => {
  const { user, company } = useCustomContext()

  return (
    <header className='header'>
      <div className='header__company'>
        <span>{company?.name}</span>
      </div>
      <div className='header__profile'>
        <h3 className='header__username'>{user?.username}</h3>
      </div>
    </header>
  )
}

export default Header

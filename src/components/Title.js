import React from 'react'
import { NavLink } from 'react-router-dom'
import './Title/Title.css'

const Title = ({ title, breadCrumb }) => {
  return (
    <div className='title'>
      <h3 className='title__name'>{title}</h3>
      <nav className='title__breadcrumb'>
        {breadCrumb
          ? breadCrumb.map((b) => {
            return (
              <NavLink className={`title__breadcrumb__item`} key={b.name} to={b.path}>
                <h4>{b.name}</h4> {b.active && <span>/</span> }
              </NavLink>
            )
          })
          : ''}

      </nav>
    </div>
  )
}

export default Title

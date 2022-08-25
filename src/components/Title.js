import React from 'react'
import { NavLink } from 'react-router-dom'
import './Title/Title.css'

const Title = ({ title, breadCrumb }) => {
  return (
    <div>
      <h3 className='title-page'>{title}</h3>
      <nav className='breadcrumb'>
        {breadCrumb
          ? breadCrumb.map((b) => {
            return (
              <NavLink className={`breadcrumb-item`} key={b.name} to={b.path}>
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

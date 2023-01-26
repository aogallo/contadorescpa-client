import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Title/Title.css'

// {
//   breadCrumb && (
//     <nav className='title__breadcrumb'>
//       {breadCrumb
//         ? breadCrumb.map((b) => {
//           return (
//             <NavLink
//               // className={`title__breadcrumb__item ${b.active && 'title__breadcrumb__item-active'}`}
//               className={`title__breadcrumb__item`}
//               key={b.name}
//               to={b.path}>
//               <h4>{b.name}</h4> {b.active && <span className='title__breadcrumb__symbol'>/</span >}
//             </NavLink>
//           )
//         })
//         : ''}
//
//     </nav>
//   )
// }
const Title = ({ title, groupButtons }) => {
  const location = useLocation()

  return (
    <div className='title'>
      <h3 className='title__name'>{title}</h3>
      <div className='title__buttons'>
        {
          groupButtons ?
            groupButtons.map((button) =>
              <NavLink
                className={`title__button
                  ${button.class}
                  ${(location.pathname.includes('/add') && button.name.includes('Agregar')) ?
                    'hidden__button' :
                    'show__button'}`}
                key={button.name}
                to={button.path}>
                {button.name}
              </NavLink>
            )
            : null
        }
      </div>
    </div>
  )
}

export default Title

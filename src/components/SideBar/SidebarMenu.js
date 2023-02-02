import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SidebarMenu = ({ menu }) => {
  const [showSubMenus, setShowSubMenus] = useState(true)
  const {
    title,
    path,
    icon,
    iconClosed,
    iconOpen,
    isMenu,
    customFunction,
    subMenus,
  } = menu

  const handleShowSubMenu = () => {
    setShowSubMenus(!showSubMenus)
  }
  // {
  //   showSubMenus ? subMenus.map((subMenu) => (
  //     <NavLink to={subMenu.path}
  //       className='sidebar__link sidebar__link--submenu'>
  //       {subMenu.icon}
  //       <span className='sidebar__subtitle'>{subMenu.title}</span>
  //     </NavLink>
  //   )) : null
  // }
  const subMenusInput = showSubMenus ? subMenus.map((subMenu) =>
    <Link
      key={subMenu.title}
      to={subMenu.path}
      className='sidebar__link sidebar__link--submenu'>
      <div>
        {subMenu.icon}
        <span className='sidebar__subtitle'>{subMenu.title}</span>
        {
          subMenu.showSubMenus ? subMenu.iconOpen : subMenu.iconClosed
        }
      </div>
    </Link>
  )
    :
    null

  // < ul className = 'sidebar__group' >
  //     <li className='sidebar__link'>
  //       <BiBuildings className='icon__left' />
  //       <span className='sidebar__subtitle'>Reportes</span>
  //       <BsChevronRight className='icon__right' />
  //     </li>
  //     <NavLink to='/' className='sidebar__link sidebar__link--submenu'>
  //       <BiBuildings className='icon__left' />
  //       <span className='sidebar__subtitle '>Cuentas por pagar</span>
  //     </NavLink>
  //   </ul >

  const handleCustomFunction = customFunction ? customFunction : handleShowSubMenu

  const principalInput = isMenu ?
    <ul className='sidebar__group'
      onClick={handleCustomFunction}>
      <li className='sidebar__link'>
        <div>
          {icon}
          <span className='sidebar__subtitle'>{title}</span>
        </div>
        <div>
          {
            showSubMenus ? iconOpen : iconClosed
          }
        </div>
      </li>
      {
        showSubMenus ? subMenusInput : null
      }
    </ul>
    :
    <Link
      to={path}
      className='sidebar__link'>
      <div>
        {icon}
        <span className='sidebar__subtitle'>{title}</span>
      </div>
    </Link>

  return (
    <>
      {
        principalInput
      }
    </>
  )
}

export default SidebarMenu

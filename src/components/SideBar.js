import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <aside id='layoutSidenav'>
      <div id='layoutSidenav_nav'>
        <nav
          className='sb-sidenav accordion sb-sidenav-dark'
          id='sidenavAccordion'>
          <div className='sb-sidenav-menu'>
            <div className='nav'>
              {/* <div className='sb-sidenav-menu-heading'>Core</div> */}
              <a
                className='nav-link collapsed'
                href='#'
                data-bs-toggle='collapse'
                data-bs-target='#collapseLayouts'
                aria-expanded='false'
                aria-controls='collapseLayouts'>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-columns'></i>
                </div>
                Catalogos
                <div className='sb-sidenav-collapse-arrow'>
                  <i className='fas fa-angle-down'></i>
                </div>
              </a>
              <div
                className='collapse'
                id='collapseLayouts'
                aria-labelledby='headingOne'
                data-bs-parent='#sidenavAccordion'>
                <nav className='sb-sidenav-menu-nested nav'>
                  <NavLink className='nav-link' to='/client'>
                    Clientes
                  </NavLink>
                  <NavLink className='nav-link' to='/provider'>
                    Proveedores
                  </NavLink>
                </nav>
              </div>

              <div className='sb-sidenav-menu-heading'>Operaciones</div>
              <NavLink className='nav-link' to='/cxp'>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-chart-area'></i>
                </div>
                Cuentas por pagar
              </NavLink>
            </div>
          </div>
          {/* <div className='sb-sidenav-footer'>
            <div className='small'>Logged in as:</div>
            Start Bootstrap
          </div> */}
        </nav>
      </div>
    </aside>
  )
}

export default SideBar

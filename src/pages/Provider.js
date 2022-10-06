import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Title from '../components/Title'

const Provider = () => {
  const [breadCrumb, setBreadCrumb] = useState([
    {
      name: 'Inicio',
      path: '/',
      active: false
    }
  ])

  return (
    <>
      <Title title='Proveedores' breadCrumb={breadCrumb} />
      <Outlet />
    </>
  )
}

export default Provider

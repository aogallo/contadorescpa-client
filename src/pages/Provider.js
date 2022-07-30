import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Title from '../components/Title'

const Provider = () => {
  const [breadCrumb, setBreadCrumb] = useState([
    {
      name: 'Inicio',
      path: '/',
      active: false,
    },
  ])

  return (
    <section className='container-fluid px-4'>
      <Title title='Proveedores' breadCrumb={breadCrumb} />
      <Outlet />
    </section>
  )
}

export default Provider

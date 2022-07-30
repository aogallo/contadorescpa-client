import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Title from '../components/Title'

const Client = () => {
  // if (loading) return <>Loading.....</>

  const [breadCrumb, setBreadCrumb] = useState([
    {
      name: 'Inicio',
      path: '/',
      active: false,
    },
  ])
  return (
    <div className='container-fluid px-4'>
      <Title title='Clientes' breadCrumb={breadCrumb} />

      <Outlet />
    </div>
  )
}

export default Client

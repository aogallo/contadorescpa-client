import React from 'react'
import { Outlet } from 'react-router-dom'
import Title from '../components/Title'

const Client = () => {
  // if (loading) return <>Loading.....</>

  const breadCrumb = [
    {
      name: 'Inicio',
      path: '/',
      active: 'active' 
    },
    {
      name: 'Clientes',
      path: '/client',
      active: ''
    }
  ]

  return (
    <div className='container-fluid px-4'>
      <Title title='Clientes' breadCrumb={breadCrumb} />

      <Outlet />
    </div>
  )
}

export default Client

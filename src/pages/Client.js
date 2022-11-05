import React from 'react'
import { Outlet } from 'react-router-dom'
import Title from '../components/Title'

const Client = () => {
  // if (loading) return <>Loading.....</>

  const breadCrumb = [
    {
      name: 'Inicio',
      path: '/',
      active: true
    },
    {
      name: 'Clientes',
      path: '/client',
      active: false
    }
  ]

  return (
    <>
      <Title title='Clientes' breadCrumb={breadCrumb} />

      <Outlet />
    </>
  )
}

export default Client

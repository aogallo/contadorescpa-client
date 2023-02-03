import React from 'react'
import { Outlet } from 'react-router-dom'
import Title from 'components/Title'

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

  const groupButtons = [
    {
      name: 'Agregar cliente',
      path: '/client/add',
      class: 'title__button--blue'
    }
  ]

  return (
    <>
      <Title title='Clientes' groupButtons={groupButtons} />
      <Outlet />
    </>
  )
}

export default Client

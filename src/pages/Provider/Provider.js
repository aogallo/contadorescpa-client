import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Title from 'components/Title'

const Provider = () => {
  const [breadCrumb] = useState([
    {
      name: 'Inicio',
      path: '/',
      active: false
    }
  ])

  const groupButtons = [
    {
      name: 'Agregar proveedor',
      path: '/provider/add',
      class: 'title__button--blue'
    }
  ]

  return (
    <>
      <Title
        title='Proveedores'
        breadCrumb={breadCrumb}
        groupButtons={groupButtons}
      />
      <Outlet />
    </>
  )
}

export default Provider

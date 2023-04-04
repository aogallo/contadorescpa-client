import React from 'react'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

const { BiUser, BiBuilding, BiArchive } = require('react-icons/bi')
const { TbReport, TbReportMoney } = require('react-icons/tb')

const menus = [
  {
    title: 'Clientes',
    path: '/client',
    icon: <BiUser className='icon__left' />,
    iconClosed: null,
    iconOpen: null,
    isMenu: false,
    subMenus: [],
    customFunction: null
  },
  {
    title: 'Compañia',
    path: '/company',
    icon: <BiBuilding className='icon__left' />,
    iconClosed: null,
    iconOpen: null,
    isMenu: false,
    subMenus: [],
    customFunction: null
  },
  {
    title: 'Proveedores',
    path: '/provider',
    icon: <BiUser className='icon__left' />,
    iconClosed: null,
    iconOpen: null,
    isMenu: false,
    subMenus: [],
    customFunction: null
  },
  {
    title: 'Facturas',
    path: '/cxp',
    icon: <BiArchive className='icon__left' />,
    iconClosed: null,
    iconOpen: null,
    isMenu: false,
    subMenus: [],
    customFunction: null
  },
  {
    title: 'Reportes',
    path: '/',
    icon: <TbReport className='icon__left' />,
    iconClosed: <BsChevronRight className='icon__right' />,
    iconOpen: <BsChevronDown className='icon__right' />,
    isMenu: true,
    subMenus: [
      {
        title: 'Cuentas por pagar',
        path: '/report/cxp',
        icon: <TbReportMoney className='icon__left' />,
        iconClosed: null,
        iconOpen: null,
        subMenus: [],
        customFunction: null
      }
    ],
    customFunction: null
  }
]

export default menus

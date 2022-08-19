import React, { lazy } from 'react'

import { Route, Routes } from 'react-router-dom'

import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Client from '../pages/Client'
import Provider from '../pages/Provider'
import ClientForm from '../components/ClientForm'
import Error404 from '../pages/Error404'
import ClientList from '../components/ClientList'
import ProviderList from '../components/ProviderList'
import ProviderForm from '../components/ProviderForm'
import AccountsPayable from '../pages/AccountsPayable'
import Home from './Home'
import AccountPayableForm from '../components/AccountPayableForm'
import AccountPayableList from '../components/AccountPayableList'

const Layout = () => {
  const AboutView = lazy(async () => await('../pages/About'))
  return (
    <div className='principal-content'>
      <SideBar />
      <section id='interface'>
        <Header />
        <h3 className='title-page'>Dashbord</h3>
        
        <div className='content'>
          Contenido principal
        </div>
      </section>
    </div>
  )
}

export default Layout

import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const { user, company } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!company.name) navigate('/')
  }, [])

  return (
    <>
      <h1>Bienvenid@ {user.username}</h1>
      <h2>Compañia seleccionada: {company.name}</h2>
    </>
  )
}

export default Home

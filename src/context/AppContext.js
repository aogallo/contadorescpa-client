import React, { createContext, useReducer, useEffect, useState } from 'react'
import { authReducer } from '../reducer/authReducer'
import { types } from 'types/types'

export const AppContext = createContext()

const companyInitial = {
  id: null,
  name: '',
  providers: []
}

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

const AppProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {}, init)
  const [company, setCompany] = useState(companyInitial)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const saveCompany = (company) => {
    setCompany(company)
  }

  const logout = () => {
    dispatch({
      type: types.logout,
      payload: user
    })
    setCompany(companyInitial)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        company,
        saveCompany,
        dispatch,
        logout
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

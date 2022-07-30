import React, { createContext, useReducer, useEffect, useState } from 'react';
import { authReducer } from '../reducer/authReducer';

export const AppContext = createContext();

const companyInitial = {
  id: null,
  name: '',
};

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
};

const AppProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [company, setCompany] = useState(companyInitial);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const saveCompany = (company) => {
    setCompany(company);
  };

  return (
    <AppContext.Provider value={{ user, company, saveCompany, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

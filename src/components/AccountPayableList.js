import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ACCOUNTS_PAYABLE } from '../graphql/AccountsPayable/queries';
import { Link, NavLink } from 'react-router-dom';

import Moment from 'react-moment';

const AccountPayableList = ({ title }) => {
  const { refetch, loading, data } = useQuery(GET_ALL_ACCOUNTS_PAYABLE);
  const [accountsPayable, setAccountsPayable] = useState([]);

  useEffect(() => {
    if (data) setAccountsPayable(data.getAllAccountPayable);
  }, [data]);

  return (
    <>
      <div className='card mb-4'>
        <div className='card-header d-flex justify-content-between'>
          <section>
            <i className='fas fa-table me-1'></i>
            {title}
          </section>
          <Link className='btn btn-primary' to='/cxp/add'>
            Agregar
          </Link>
        </div>
        <div className='card-body'>
          <table className='table table-responsive table-striped'>
            <thead>
              <tr>
                <th>Serie</th>
                <th>Numero</th>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Cuenta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>Cargando....</td>
                </tr>
              ) : (
                accountsPayable &&
                accountsPayable.map((accountPayable) => (
                  <tr key={accountPayable.id}>
                    <td>{accountPayable.serie}</td>
                    <td>{accountPayable.documentNumber}</td>
                    <td>
                      <Moment format='DD/MM/YYYY'>
                        {accountPayable.documentDate}
                      </Moment>
                    </td>
                    <td>{accountPayable.proveedor.name}</td>
                    <td>{`${accountPayable.account.accountNumber} - ${accountPayable.account.name}`}</td>
                    <td className='col-sm-2'>
                      <NavLink
                        className='btn btn-primary btn-sm'
                        to={`/cxp/edit/${accountPayable.id}`}>
                        Editar
                      </NavLink>
                      <button type='button' className='btn btn-danger btn-sm'>
                        Anular
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccountPayableList;

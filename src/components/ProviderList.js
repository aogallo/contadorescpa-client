import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_PROVIDERS } from "../graphql/Provider/queries";

const ProviderList = ({ title }) => {
  const { loading, error, data } = useQuery(GET_ALL_PROVIDERS);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (data) setProviders(data.getAllProviders);
  }, [data]);

  return (
    <section className="card mb-4">
      <section className="card-header d-flex justify-content-between">
        <section>
          <i className="fas fa-table me-1"></i>
          {title}
        </section>
        <Link className="btn btn-primary" to="/provider/add">
          Agregar
        </Link>
      </section>
      <section className="card-body">
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>NIT</th>
              <th>Correo</th>
              <th>Contacto</th>
              <th>Producto de interes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.name}</td>
                <td>{provider.nit}</td>
                <td>{provider.email}</td>
                <td>61</td>
                <td></td>
                <td className="col-sm-2">
                  <button type="button" className="btn btn-primary btn-sm">
                    Editar
                  </button>
                  <button type="button" className="btn btn-danger btn-sm">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ProviderList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_CLIENTS } from "../graphql/Client/queries";
import CustomModal from "./Modal";

const ClientList = ({ title }) => {
  const { loading, error, data } = useQuery(GET_ALL_CLIENTS);
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data) setClients(data.getAllClients);
  }, [data]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAction = () => {};

  return (
    <>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <section>
            <i className="fas fa-table me-1"></i>
            {title}
          </section>
          <Link className="btn btn-primary" to="/client/add">
            Agregar
          </Link>
        </div>
        <div className="card-body">
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
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.nit}</td>
                  <td>{client.email}</td>
                  <td>61</td>
                  <td></td>
                  <td className="col-sm-2">
                    <button
                      type="button"
                      onClick={() => console.log("editar")}
                      className="btn btn-primary btn-sm">
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={handleShowModal}
                      className="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <CustomModal
          title="cliente"
          handleAction={handleAction}
          handleClose={handleClose}>
          Hola
        </CustomModal>
      )}
    </>
  );
};

export default ClientList;

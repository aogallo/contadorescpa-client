import React from "react";
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
  const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div className="container-fluid px-4">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <button onClick={handleCancel} className="btn">
              <i className="fas fa-arrow-left"></i>
            </button>
            Agregar Cliente
          </div>
          <div className="card-body">
            <form>
              {/* Name */}
              <div className="mb-3 row">
                <label for="name" className="col-sm-2 form-label">
                  Nombre
                </label>
                <div className="col-sm-10">
                  <input id="name" type="text" className="form-control" />
                </div>
              </div>

              {/* NIT */}
              <div className="mb-3 row">
                <label for="nit" className="col-sm-2 form-label">
                  NIT
                </label>
                <div className="col-sm-10">
                  <input id="nit" type="text" className="form-control" />
                </div>
              </div>

              {/* Address */}
              <div className="mb-3 row">
                <label for="address" className="col-sm-2 form-label">
                  Dirección
                </label>
                <div className="col-sm-10">
                  <textarea id="address" className="form-control" />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3 row">
                <label for="email" className="col-sm-2 form-label">
                  Correo
                </label>
                <div className="col-sm-10">
                  <input type="email" id="email" className="form-control" />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-3 row">
                <label for="phone" className="col-sm-2 form-label">
                  Teléfono
                </label>
                <div className="col-sm-10">
                  <input className="form-control" id="phone" type="text" />
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;

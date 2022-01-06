import React, { useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const AccountsPayable = () => {
  const [documentDate, setDocumentDate] = useState();
  const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div className="container-fluid px-4">
      <Title title="Cuentas por Pagar" />
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <button onClick={handleCancel} className="btn">
              <i class="fas fa-arrow-left"></i>
            </button>
            Agregar cuenta por pagar
          </div>
          <div className="card-body">
            <form>
              {/* Serie */}
              {/* <div className="mb-3 row">
                <label for="serie" className="col-sm-2 form-label">
                  Serie
                </label>
                <div className="col-sm-10">
                  <input
                    id="serie"
                    type="text"
                    name="serie"
                    className="form-control"
                  />
                </div>
              </div> */}
              <div className="input-group mb-3">
                <label for="serie" className="col-sm-2 form-label">
                  Serie
                </label>
                <div className="col-sm-4">
                  <input
                    id="serie"
                    type="text"
                    name="serie"
                    className="form-control"
                    placeholder="Serie"
                  />
                </div>
                {/* Document Number */}

                <label for="serie" className="mx-2 col-sm-1 form-label">
                  Número
                </label>

                <input
                  id="document_number"
                  name="document_number"
                  type="text"
                  placeholder="Número del documento"
                  className="form-control"
                />
              </div>

              {/* <div className="mb-3 row">
                <label for="document_number" className="col-sm-2 form-label">
                  Numero de documento
                </label>
                <div className="col-sm-10">
                  <input
                    id="document_number"
                    name="document_number"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div> */}

              <div className="input-group mb-3">
                {/* Tipo */}
                <label for="type_document" className="col-sm-2 form-label">
                  Tipo de documento
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    id="type_document"
                    name="type_document"
                    className="form-control"
                  />
                </div>

                {/* Document Date */}
                <label for="document_date" className="mx-2 col-sm-1 form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  id="document_date"
                  name="document_date"
                  className="form-control"
                />
              </div>
              {/* Provider */}
              <div className="mb-3 row">
                <label for="provider" className="col-sm-2 form-label">
                  Proveedor
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    list="datalistOptions"
                    id="provider"
                    type="text"
                    placeholder="Buscar proveedor..."
                  />
                  <datalist id="datalistOptions">
                    <option value="San Francisco" />
                    <option value="New York" />
                    <option value="Seattle" />
                    <option value="Los Angeles" />
                    <option value="Chicago" />
                  </datalist>
                </div>
              </div>

              <div className="input-group mb-3">
                {/* Exento */}
                <label for="exento" className="col-sm-2 form-label">
                  Exento
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    id="exento"
                    name="exento"
                    className="form-control"
                  />
                </div>
                {/* Import */}

                <label for="import" className="mx-2 col-sm-1 form-label">
                  Importación
                </label>
                <input
                  type="number"
                  id="import"
                  name="import"
                  className="form-control"
                />
              </div>

              <div className="input-group mb-3">
                {/* Service */}
                <label for="service" className="col-sm-2 form-label">
                  Servicio
                </label>
                <div className="col-sm-4">
                  <input
                    type="number"
                    id="service"
                    name="service"
                    className="form-control"
                  />
                </div>

                {/* Assets (bienes) */}

                <label for="assets" className="mx-2 col-sm-1 form-label">
                  Bienes
                </label>

                <input
                  type="number"
                  id="assets"
                  name="assets"
                  className="form-control"
                />
              </div>

              {/* Account */}
              <div className="mb-3 row">
                <label for="account" className="col-sm-2 form-label">
                  Cuenta
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    list="datalistOptions"
                    id="provider"
                    type="text"
                    placeholder="Seleccionar cuenta..."
                  />
                  <datalist id="datalistOptions">
                    <option value="San Francisco" />
                    <option value="New York" />
                    <option value="Seattle" />
                    <option value="Los Angeles" />
                    <option value="Chicago" />
                  </datalist>
                </div>
              </div>

              {/* Sub-total */}
              <div className="mb-3 row">
                <label for="sub_total" className="col-sm-2 form-label">
                  Sub-total
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    id="sub_total"
                    name="sub_total"
                    className="form-control"
                  />
                </div>
              </div>

              {/* IVA */}
              <div className="mb-3 row">
                <label for="iva" className="col-sm-2 form-label">
                  IVA
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    id="iva"
                    name="iva"
                    className="form-control"
                  />
                </div>
              </div>

              {/* TOTAL */}
              <div className="mb-3 row">
                <label for="total" className="col-sm-2 form-label">
                  Total
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    id="total"
                    name="total"
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button type="button" class="btn btn-danger" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPayable;

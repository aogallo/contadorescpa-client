import { Formik } from "formik";
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
            {/* INICIO DE FORMULARIO */}

            <Formik
              initialValues={{
                nombre: "",
                nit: "",
                address: "",
                email: "",
                phone: "",
              }}
              validate={(valores) => {
                let errores = {};

                if (!valores.nombre) {
                  errores.nombre = " Por favor ingresa tu nombre";
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
                  errores.nombre =
                    " El nombre solo puede contener letras y espacios";
                }

                if (!valores.nit) {
                  errores.nit = " Por favor ingresa el número de NIT";
                }

                if (!valores.address) {
                  errores.address = " Por favor ingresa una dirección válida ";
                }

                if (!valores.email) {
                  errores.email =
                    "Por favor ingresa una dirección de correo eletrónico";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    valores.email
                  )
                ) {
                  errores.email = "El correo ingresado es invalido";
                }

                if (!valores.phone) {
                  errores.phone = " Por favor ingresa un número de teléfono ";
                } else if (!/^\d*$/.test(valores.phone)) {
                  errores.phone = " El número de teléfono es invalido";
                }

                return errores;
              }}
              onSubmit={(valores, { resetForm }) => {
                resetForm();
                console.log(valores);
                console.log("Formulario enviado");
              }}
            >
              {({
                values,
                touched,
                handleSubmit,
                handleChange,
                errors,
                handleBlur,
              }) => (
                <form className="agregCliente" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 form-label">
                      Nombre
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        name="nombre"
                        id="inputNombre"
                        type="text"
                        value={values.nombre}
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={handleBlur}
                      />
                      {touched.nombre && errors.nombre && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.nombre}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NIT */}
                  <div className="mb-3 row">
                    <label htmlFor="nit" className="col-sm-2 form-label">
                      NIT
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        name="nit"
                        id="inputNit"
                        type="text"
                        value={values.nit}
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={handleBlur}
                      />
                      {touched.nit && errors.nit && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.nit}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-3 row">
                    <label htmlFor="address" className="col-sm-2 form-label">
                      Dirección
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        id="address"
                        className="form-control"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={handleBlur}
                      />
                      {touched.address && errors.address && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.address}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 form-label">
                      Correo
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        name="email"
                        id="inputEmail"
                        type="text"
                        placeholder="name@example.com"
                        value={values.email}
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-3 row">
                    <label htmlFor="phone" className="col-sm-2 form-label">
                      Teléfono
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        name="phone"
                        id="inputphone"
                        type="text"
                        value={values.phone}
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={handleBlur}
                      />
                      {touched.phone && errors.phone && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      {""}
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
                </form>
              )}
            </Formik>
          </div>

          {/* <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}>
              Cancelar
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClientForm;

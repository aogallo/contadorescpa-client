import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useMutation } from "@apollo/client";
import { CREATE_PROVIDER } from "../graphql/Provider/mutations";

const ProviderForm = () => {
  const navigate = useNavigate();
  const { company } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [createProvider, { data }] = useMutation(CREATE_PROVIDER);
  const providerValues = {
    name: "",
    nit: "",
    address: "",
    email: "",
    phone: "",
    creditDay: "",
  };

  useEffect(() => {
    if (!company.name) navigate("/");
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleValidate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Por favor ingrese el nombre";
    }
    if (!values.nit) {
      errors.nit = "Por favor ingrese el NIT";
    }
    // if (!values.address) {
    //   errors.address = "Por favor ingrese el dirección";
    // }
    // if (!values.email) {
    //   errors.email = "Por favor ingrese correo electrónico";
    // }
    // if (!values.phone) {
    //   errors.phone = "Por favor ingrese teléfono";
    // }
    // if (!values.creditDay) {
    //   errors.creditDay = "Por favor ingrese los días de credito";
    // }

    return errors;
  };

  const handleCreateProvider = async (values, { resetForm }) => {
    try {
      await createProvider({
        variables: {
          provider: {
            name: values.name,
            nit: values.nit,
            address: values.address,
            email: values.email,
            phone: values.phone,
            creditDay: Number(values.creditDay),
            idCompany: company.id,
          },
        },
      });

      setMessage({ error: false, message: "Proveedor creado correctamente" });
      setTimeout(() => {
        setMessage(null);
        navigate(-1);
      }, 1500);
    } catch (error) {
      setMessage({ error: true, message: error.message });
      console.log(error);
    }
  };
  return (
    <div className="container-fluid px-4">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <button onClick={handleCancel} className="btn">
              <i className="fas fa-arrow-left"></i>
            </button>
            Agregar Proveedor
          </div>
          <div className="card-body">
            <Formik
              initialValues={providerValues}
              validate={handleValidate}
              onSubmit={handleCreateProvider}>
              {({ errors, touched }) => (
                <Form>
                  {/* Name */}
                  <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 form-label">
                      Nombre
                    </label>
                    <div className="col-sm-10">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    {touched.name && errors.name && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* NIT */}
                  <div className="mb-3 row">
                    <label htmlFor="nit" className="col-sm-2 form-label">
                      NIT
                    </label>
                    <div className="col-sm-10">
                      <Field
                        id="nit"
                        name="nit"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    {touched.nit && errors.nit && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.nit}
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="mb-3 row">
                    <label htmlFor="address" className="col-sm-2 form-label">
                      Dirección
                    </label>
                    <div className="col-sm-10">
                      <Field
                        id="address"
                        name="address"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 form-label">
                      Correo
                    </label>
                    <div className="col-sm-10">
                      <Field
                        name="email"
                        type="email"
                        id="email"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-3 row">
                    <label htmlFor="phone" className="col-sm-2 form-label">
                      Teléfono
                    </label>
                    <div className="col-sm-10">
                      <input className="form-control" id="phone" type="text" />
                    </div>
                  </div>

                  {/* Credit day */}
                  <div className="mb-3 row">
                    <label htmlFor="creditDay" className="col-sm-2 form-label">
                      Días de credito
                    </label>
                    <div className="col-sm-10">
                      <Field
                        name="creditDay"
                        type="text"
                        className="form-control"
                        id="creditDay"
                      />
                    </div>
                  </div>
                  {message && (
                    <div
                      className={`message ${
                        message.error ? "message-error" : "message-success"
                      }`}>
                      {message.message}
                    </div>
                  )}
                  <div className="">
                    <button
                      type="button"
                      type="submit"
                      className="btn btn-primary">
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-danger">
                      Cancelar
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderForm;

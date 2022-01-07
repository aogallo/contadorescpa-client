import React from "react";
import { Formik } from "formik";

const Login = () => {
  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center  font-weight-light my-4">
                      Login
                    </h3>
                  </div>
                  <div className="card-body">
                    {/* /* INICIO DE FORMULARIO */}
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validate={(valores) => {
                        let errores = {};

                        if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            valores.email
                          )
                        ) {
                          errores.email = "El correo ingresado es invalido";
                        }

                        return errores;
                      }}
                      onSubmit={(valores, { resetForm }) => {
                        resetForm();
                        console.log(valores);
                        console.log("Formulario enviado");
                      }}
                    >
                      {({ values, handleSubmit, handleChange, errors }) => (
                        <form className="formulario" onSubmit={handleSubmit}>
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              name="email"
                              id="inputEmail"
                              type="text"
                              placeholder="name@example.com"
                              value={values.email}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            {errors.email && (
                              <div className="error" style={{ color: "red" }}>
                                {errors.email}
                              </div>
                            )}
                            <label htmlFor="inputEmail">Email</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              name="password"
                              id="inputPassword"
                              type="password"
                              placeholder="Password"
                              value={values.password}
                              onChange={handleChange}
                            />
                            <label htmlFor="inputPassword">Password</label>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a className="small" href="password.html">
                              ¿ Has olvidado la contraseña ?
                            </a>
                            {/* <a className="btn btn-primary" href="index.html">
                              Login
                            </a> */}
                            <button className="btn btn-primary" type="submit">
                              {" "}
                              Login
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                    {/* /* /**FINAL DE FORMULARIO */}
                  </div>
                  <div className="card-footer text-center py-3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Contadores CPA 2022
              </div>
              <div>
                <a href="#"></a>
                &middot;
                <a href="#"></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;

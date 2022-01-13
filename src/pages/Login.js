import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/Login/mutations";

import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";
import { Formik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (user) return;
      await login({ variables: { username, password } });

      if (data) {
        console.log(`data hook`, data);
        const user = {
          token: data.login.token,
          ...data.login.user,
        };

        dispatch({
          type: types.login,
          payload: user,
        });

        navigate("/");
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

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

                        if (!valores.email) {
                          errores.email = "Por favor ingresa tu email";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            valores.email
                          )
                        ) {
                          errores.email = "El correo ingresado es invalido";
                        }

                        if (!valores.password) {
                          errores.password = " Por favor ingresa tu contraseña";
                        }

                        return errores;
                      }}
                      onSubmit={(valores, { resetForm }) => {
                        resetForm();
                        console.log(valores);
                        console.log("Formulario enviado");
                      }}>
                      {({
                        values,
                        touched,
                        handleSubmit,
                        handleChange,
                        errors,
                      }) => (
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
                            {touched.email && errors.email && (
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
                            {touched.password && errors.password && (
                              <div className="error" style={{ color: "red" }}>
                                {errors.password}
                              </div>
                            )}
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

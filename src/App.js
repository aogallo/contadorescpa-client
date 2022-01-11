import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Client from "./pages/Client";
import Provider from "./pages/Provider";
import ClientForm from "./components/ClientForm";
import Error404 from "./pages/Error404";
import ClientList from "./components/ClientList";
import About from "./pages/About";
import ProviderList from "./components/ProviderList";
import ProviderForm from "./components/ProviderForm";
import AccountsPayable from "./pages/AccountsPayable";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="sb-nav-fixed">
      <BrowserRouter>
        {isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        ) : (
          <>
            <SideBar />
            <Header />
            <div id="layoutSidenav">
              <div id="layoutSidenav_content">
                <Routes>
                  <Route path="/" element={<About />}></Route>
                  <Route path="/client" element={<Client />}>
                    <Route
                      path=""
                      element={<ClientList title="Listado de clientes" />}
                    />
                    <Route path="add" element={<ClientForm />} />
                  </Route>
                  <Route path="/provider" element={<Provider />}>
                    <Route
                      path=""
                      element={<ProviderList title="Listado de proveedores" />}
                    />
                    <Route path="add" element={<ProviderForm />} />
                  </Route>
                  <Route path="/cxp" element={<AccountsPayable />}></Route>
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

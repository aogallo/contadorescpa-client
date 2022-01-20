import React from "react";

import { Route, Routes } from "react-router-dom";

import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Client from "../pages/Client";
import Provider from "../pages/Provider";
import ClientForm from "../components/ClientForm";
import Error404 from "../pages/Error404";
import ClientList from "../components/ClientList";
import About from "../pages/About";
import ProviderList from "../components/ProviderList";
import ProviderForm from "../components/ProviderForm";
import AccountsPayable from "../pages/AccountsPayable";
import Home from "./Home";

const Layout = () => {
  return (
    <div className="sb-nav-fixed">
      <SideBar />
      <Header />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <Routes>
            <Route path="/" element={<About />}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/client" element={<Client />}>
              <Route
                path=""
                element={<ClientList title="Listado de clientes" />}
              />
              <Route path="add" element={<ClientForm />} />
              <Route path="edit/:id" element={<ClientForm />} />
            </Route>
            <Route path="/provider" element={<Provider />}>
              <Route
                path=""
                element={<ProviderList title="Listado de proveedores" />}
              />
              <Route path="add" element={<ProviderForm />} />
              <Route path="edit/:id" element={<ProviderForm />} />
            </Route>
            <Route path="/cxp" element={<AccountsPayable />}></Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;

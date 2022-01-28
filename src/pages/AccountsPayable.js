import React from "react";
import { Outlet } from "react-router-dom";
import Title from "../components/Title";

const AccountsPayable = () => {
  return (
    <div className="container-fluid px-4">
      <Title title="Cuentas por Pagar" />
      <Outlet />
    </div>
  );
};

export default AccountsPayable;

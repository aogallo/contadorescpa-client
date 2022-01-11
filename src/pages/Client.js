import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Title from "../components/Title";
import { useQuery } from "@apollo/client";
import { GET_ALL_CLIENTS } from "../graphql/Client/queries";

const Client = () => {
  const { loading, error, data } = useQuery(GET_ALL_CLIENTS);

  console.log(`data`, data);

  console.log(`error`, error);

  // if (loading) return <>Loading.....</>;

  const [breadCrumb, setBreadCrumb] = useState([
    {
      name: "Inicio",
      path: "/",
      active: false,
    },
  ]);
  return (
    <div className="container-fluid px-4">
      <Title title="Clientes" breadCrumb={breadCrumb} />

      <Outlet />
    </div>
  );
};

export default Client;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { user, company } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!company.name) navigate("/");
  }, []);

  return (
    <div className="container-fluid px-4">
      <h1>Bienvenid@ {user.username}</h1>
      <h2>Compañia seleccionada: {company.name}</h2>
    </div>
  );
};

export default Home;

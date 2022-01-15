import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPANIES } from "../graphql/Company/queries";
import { AppContext } from "../context/AppContext";
import Title from "../components/Title";
import Search from "../components/Search";

const About = () => {
  const { errors, data } = useQuery(GET_ALL_COMPANIES);
  const { company, saveCompany } = useContext(AppContext);
  const [companies, setCompanies] = useState([]);
  const [filterCompanies, setFilterCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [breadCrumb, setBreadCrumb] = useState([
    {
      name: "Inicio",
      path: "/",
      active: false,
    },
  ]);

  useEffect(() => {
    if (data) {
      console.log(`data`, data);
      setCompanies(data.getAllCompanies);
      setFilterCompanies(data.getAllCompanies);
    }
  }, [data]);

  const handleSearch = ({ target }) => {
    setSearch(target.value);
    filterTerm(target.value);
  };

  const filterTerm = (term) => {
    const result = filterCompanies.filter((compay) => {
      if (
        compay.name
          .toString()
          .toLowerCase()
          .includes(term.toLocaleLowerCase())
      ) {
        return compay;
      }
    });

    setCompanies(result);
  };

  const handleSelectCompany = (company) => {
    console.log(`company`, company);
  };

  return (
    <div className="container-fluid px-4">
      <Title title="Compañias" breadCrumb={breadCrumb} />

      <div className="form-inline input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Buscar compañia"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {companies && (
        <div className="container row">
          {companies.map((company) => (
            <div
              key={company.id}
              className="col-sm-4"
              onClick={() => handleSelectCompany(company)}>
              <div className="card w-20 mt-2 card-custom">
                <div className="card-header">{company.name}</div>
                <div className="card-body">
                  <label className="form-label">NIT: {company.nit}</label>
                  <label className="form-label">
                    Actividad comercial: {company.comercialActivity}
                  </label>
                  <label>Fecha: {company.dateBirth}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;

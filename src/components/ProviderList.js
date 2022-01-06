import React from "react";
import { Link } from "react-router-dom";

const ProviderList = ({ title }) => {
  return (
    <section className="card mb-4">
      <section className="card-header d-flex justify-content-between">
        <section>
          <i className="fas fa-table me-1"></i>
          {title}
        </section>
        <Link className="btn btn-primary" to="/provider/add">
          Agregar
        </Link>
      </section>
      <section className="card-body">
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>NIT</th>
              <th>Correo</th>
              <th>Contacto</th>
              <th>Producto de interes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td className="col-sm-2">
                <button type="button" className="btn btn-primary">
                  Editar
                </button>
                <button type="button" className="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>Garrett Winters</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>63</td>
              <td>2011/07/25</td>
              <td>$170,750</td>
            </tr>
            <tr>
              <td>Ashton Cox</td>
              <td>Junior Technical Author</td>
              <td>San Francisco</td>
              <td>66</td>
              <td>2009/01/12</td>
              <td>$86,000</td>
            </tr>
            <tr>
              <td>Cedric Kelly</td>
              <td>Senior Javascript Developer</td>
              <td>Edinburgh</td>
              <td>22</td>
              <td>2012/03/29</td>
              <td>$433,060</td>
            </tr>
            <tr>
              <td>Airi Satou</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>33</td>
              <td>2008/11/28</td>
              <td>$162,700</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ProviderList;

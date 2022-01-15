import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  return user.logged ? children : <Navigate to="/login" />;
  // return children;
};
export default PrivateRoute;

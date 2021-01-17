import React from "react";
import { Redirect, Route } from "react-router-dom";
const ProtectedRoute = ({ component: Component, isAuthentic, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentic ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;

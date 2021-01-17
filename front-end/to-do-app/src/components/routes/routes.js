import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./../login/login";
import Todo from "./../todo/todo";
import ProtectedRoute from "./protectedRoute";
const Routes = ({ isLogged }) => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/" component={Todo} isAuthentic={isLogged} />
    </Switch>
  );
};

export default Routes;

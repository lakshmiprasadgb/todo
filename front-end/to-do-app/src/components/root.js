import React, { useState } from "react";
import { connect } from "react-redux";
import NavBar from "./navbar/navbar";
import Routes from "./routes/routes";

const Root = ({ isLogged }) => {
  return (
    <>
      <NavBar />
      <Routes isLogged={isLogged} />
    </>
  );
};

const MapStateToProps = ({ loggedUser }) => {
  const { isLogged } = loggedUser;
  return {
    isLogged,
  };
};
export default connect(MapStateToProps)(Root);

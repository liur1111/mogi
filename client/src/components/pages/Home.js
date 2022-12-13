import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Menu from "../modules/Menu.js";
import Summary from "../modules/Summary.js";

import "../../utilities.css";
import "./Home.css";


/**
 * @param userId
 * @param handleLogin
 * @param handleLogout
 */
const Home = (props) => {
  return (
    <>
      <Menu userId={props.userId} handleLogin={props.handleLogin} handleLogout={props.handleLogout} clientID={props.clientID}/>
      <Summary></Summary>
    </>
  );
};

export default Home;
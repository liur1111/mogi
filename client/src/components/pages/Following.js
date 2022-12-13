import React, { useState, useEffect } from "react";
import FollowSummary from "../modules/FollowSummary.js";
import "../../utilities.css";
import GoogleLogin from "react-google-login";
import "./Profile.css";

const Following = (props) => {
  useEffect(() => {
    document.title = "Following";
  }, []);

  return props.userId ? (
    <FollowSummary userId={props.userId} />
  ): (
    <div>
      access denied... please 
      <GoogleLogin
        clientId={props.clientID}
        buttonText="Login"
        onSuccess={props.handleLogin}
        onFailure={(err) => console.log(err)}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} className="Button-invisible">
            sign in
          </button>
        )}
      />
    </div>
  );
};

export default Following;
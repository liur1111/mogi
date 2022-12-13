import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { post } from "../../utilities";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Settings.css";
import "./CreateTextBox.css";
import "../modules/Box.css";

/**
 * Settings
 *
 * Proptypes
 * @param userId
 * @param handleLogout
 */
const Settings = (props) => {
  const TEXTBOX_DEFAULT_TEXT = "enter new username...";
  const [textBuffer, setTextBuffer] = useState(""); // stores text as the user is editing the box
  const [isTaken, setIsTaken] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  function handleChange(event) {
    setTextBuffer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTextBuffer(textBuffer);

    post("/api/changeUserName", {
      userId: props.userId,
      username: textBuffer,
    }).then((result) => {
      console.log(result);
      if (!result) { 
        setIsTaken(true);
      } else {
        setIsTaken(false);
      }
    });
    setIsSearched(true);
    setTextBuffer("");
  }

  return (
    <>
      {props.userId ? (
        <div>
          <GoogleLogout
            clientId={props.clientID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            isSignedIn={false}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="Button-logout">
                <Link to="/" className="logoutLink">Logout</Link>
              </button>
            )}
          />
          <div className="Textbox-container">
            <input
              className="Textbox-info"
              type="text"
              placeholder={TEXTBOX_DEFAULT_TEXT}
              value={textBuffer}
              onChange={handleChange}
            ></input>

            <button onClick={handleSubmit}>submit</button>
          </div>
          {isSearched ? (
            (isTaken) ? (
              <div>username taken</div>
            ) : ( 
              <div>success</div>
            )
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>nothing to see here... 
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
          to see more
        </div>
      )}
    </>
  );
};

export default Settings;

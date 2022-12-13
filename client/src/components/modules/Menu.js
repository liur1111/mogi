import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Menu.css";
import mogiLogo from "../../public/mogiLogo6.png";

/**
 * Menu Bar
 *
 * Proptypes
 * @param userId
 * @param handleLogin
 */
const Menu = (props) => {
  return (
    <>
      {props.userId ? (
        <div className="Menu-container">
          <div class="Logo">
            <Link to="/">
              <img src={mogiLogo} />
            </Link>
          </div>
          <div className="MenuOption-container">
            <Link to="/explore" className="MenuOption">
              <i class="fas fa-search fa-lg"></i>
            </Link>
            <Link to={"/profile/" + props.userId} className="MenuOption">
              <i class="fas fa-user fa-xs"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="Menu-container">
          <div class="Logo">
            <Link to="/">
              <img src={mogiLogo} />
            </Link>
          </div>
          <GoogleLogin
            clientId={props.clientID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            render={(renderProps) => (
              <div onClick={renderProps.onClick} className="MenuOption SignInButton">
                sign in
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default Menu;

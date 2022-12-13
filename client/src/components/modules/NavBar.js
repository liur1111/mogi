import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";
import mogiLogo from "../../public/mogiIcon.png";

/**
 * Navigation Bar on the side of pages.
 */
const NavBar = (props) => {
  return (
    <>
      <div className="NavBar-container">
        <div className="NavBar-top">
          <Link to="/">
            <img src={mogiLogo} />
          </Link>
          <Link to="/explore">
            <i className="fas fa-search fa-xs"></i> explore
          </Link>
          {props.userId ? (
            <Link to={"/profile/" + props.userId} >
              <i className="fas fa-user fa-xs"></i> profile
            </Link>
          ) : (
            <Link to={"/profile/myProfile"} >
              <i className="fas fa-user fa-xs"></i> profile
            </Link>
          )}
          <Link to={"/following/"}>
            <i className="fas fa-newspaper fa-xs"></i> follow
          </Link>
          <Link to="/saved">
            <i className="fas fa-save fa-xs"></i> saved
          </Link>
        </div>
        <div className="NavBar-bottom">
          <Link to="/notifications">
            <i className="fas fa-bell fa-xs"></i> alerts
          </Link>
          <Link to="/settings">
            <i className="fas fa-cog fa-xs"></i> settings
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;

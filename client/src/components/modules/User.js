import React, { useEffect } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";
import "./Box.css";

/**
 * Prototypes:
 *
 *@param {Number} userId
 *@param {String} userName
 *
 * @returns User
 */
const User = (props) => {
  return (
    <div className="Box" style={{ backgroundColor: "#f0f0f0" }}>
      <Link to={"/profile/" + props.userId}>
        <div className="content-default">
          <p>{props.userName}</p>
        </div>
      </Link>
    </div>
  );
};

/**
 * Prototypes:
 *
 *@param {Number} userId
 *@param {String} userName
 *@param pageId
 *
 * @returns User
 */
const AddingUser = (props) => {
  function handleAdd(event) {
    event.preventDefault();
    post("/api/addUser", {
      pageId: props.pageId,
      newUser: props.userId,
    }).then(() => {
      location.href = "/page/" + props.pageId;
    });
  }

  return (
    <div className="Box" style={{ backgroundColor: "#e9e9e9" }}>
      <Link to={""} onClick={handleAdd}>
        <div className="content">
          <p>{props.userName}</p>
        </div>
      </Link>
    </div>
  );
};

export { User, AddingUser };

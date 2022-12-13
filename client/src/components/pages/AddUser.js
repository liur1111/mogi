import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { AddingUser } from "../modules/User.js";
import "./CreateTextBox.css";
import "../modules/Box.css";
import "../modules/PageInfo.css";
import "../modules/BigBox.css";
import "../../utilities.css";
import "../modules/PageContent.css";

/**
 * @param pageId
 * @param userId
 * @param newUser
 * @returns 
 */
const AddUser = (props) => {
  const SEARCH_DEFAULT_TEXT = "Search username here...";
  const [searchBuffer, setSearchBuffer] = useState(""); // stores text as the user is editing the box
  const [usersDisplayed, setUsersDisplayed] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  function handleChange(event) {
    setSearchBuffer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchBuffer(searchBuffer);
    get("/api/userByUserName", {username: searchBuffer}).then((users) => {
      setUsersDisplayed(users);
      setIsSearched(true);
    });
  }

  let usersList = [];
  if (usersDisplayed.length > 0) {
    usersList = usersDisplayed.map((user) => <AddingUser userId={user._id} userName={user.username} pageId={props.pageId}/>);
  } else {
    usersList = <div>no results found!</div>
  }

  useEffect(() => {}, [props.userId, props.pageId]);
  
  return (
    <div>
      <div className="Textbox-container">
        <input
          placeholder={SEARCH_DEFAULT_TEXT}
          value={searchBuffer}
          onChange={handleChange}
        ></input>

        <button onClick={handleSubmit}>search</button>
      </div>
 
      {isSearched ? (
        usersList
      ): (
        <></>
      )}

  </div>
  );
};

export default AddUser;

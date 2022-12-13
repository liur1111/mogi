import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { User } from "../modules/User.js";
import "./CreateTextBox.css";
import "../modules/Box.css";
import "../modules/PageInfo.css";
import "../modules/BigBox.css";
import "../../utilities.css";
import "../modules/PageContent.css";
import "./Explore.css";

/**
 * no props
 * @returns search bar for searching users
 */
const Explore = () => {
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
    get("/api/userByUserName", { username: searchBuffer }).then((users) => {
      setUsersDisplayed(users);
      setIsSearched(true);
    });
  }

  let usersList = [];
  if (usersDisplayed.length > 0) {
    usersList = usersDisplayed.map((user) => <User userId={user._id} userName={user.username} />);
  } else {
    usersList = <div>no results found!</div>;
  }

  useEffect(() => {}, []);

  return (
    <div className="Explore-container">
      <div className="Explore-search-container">
        <input
          className="Explore-search-input"
          placeholder={SEARCH_DEFAULT_TEXT}
          value={searchBuffer}
          onChange={handleChange}
        ></input>

        <div className="Explore-search-button" onClick={handleSubmit}>
          search
        </div>
      </div>

      {isSearched ? <div className="Explore-results">{usersList}</div> : <></>}
    </div>
  );
};

export default Explore;

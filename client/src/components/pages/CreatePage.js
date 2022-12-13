import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { useHistory } from "react-router-dom";
import "./CreatePage.css";
import "../modules/Box.css";
import "../modules/PageInfo.css";
import "../../utilities.css";
import Toggle from "react-toggle"; // react-toggle 3rd party library: github.com/aaronshaf/react-toggle
import "react-toggle/style.css"; // for ES6 modules

const CreatePage = (props) => {
  const BIO_DEFAULT_TEXT = "Add bio here...";
  const NAME_DEFAULT_TEXT = "Add page name here...";
  const [bioBuffer, setBioBuffer] = useState(""); // stores text as the user is editing the box
  const [nameBuffer, setNameBuffer] = useState(""); // stores text as the user is editing the box
  const [groupBuffer, setGroupBuffer] = useState(false);

  function handleBioChange(event) {
    setBioBuffer(event.target.value);
  }

  function handleNameChange(event) {
    setNameBuffer(event.target.value);
  }

  function handleGroupChange(event) {
    const allowJoin = event.target.checked;
    setGroupBuffer(allowJoin);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setBioBuffer(bioBuffer);
    setNameBuffer(nameBuffer);
    setGroupBuffer(groupBuffer);
    const body = {
      creator_id: props.userId,
      page: {
        isGroup: groupBuffer,
        content: [],
        bio: bioBuffer,
        master: props.pageId,
        name: nameBuffer,
      },
    };
    if (props.pageId !== "undefined") {
      post("/api/page", body).then(() => {
        location.href = "/page/" + props.pageId;
      });
    } else {
      post("/api/page", body).then(() => {
        location.href = "/profile/" + props.userId;
      });
    }
  }

  useEffect(() => {}, [props.pageId]);

  return (
    <div className="Page-outline-container">
      what is this page for?
      <div className="Page-info-container">
        <div className="Item page">
          <div className="Page-content">page</div>
        </div>
        <div className="Page-input-container">
          <input
            className="Page-name-input"
            type="text"
            placeholder={NAME_DEFAULT_TEXT}
            value={nameBuffer}
            onChange={handleNameChange}
          ></input>
          <textarea
            className="Page-bio-input"
            placeholder={BIO_DEFAULT_TEXT}
            value={bioBuffer}
            onChange={handleBioChange}
            name="text"
            wrap="soft"
            maxlength="480"
          ></textarea>
        </div>
      </div>
      <div className="u-seperate"></div>
      <div className="Page-submit-container">
        <div className="Page-toggle-container">
          allow groups
          <Toggle id="cheese-status" defaultChecked={groupBuffer} onChange={handleGroupChange} />
        </div>
        {nameBuffer.length > 0 ? (
          <button className="Submit-button page" onClick={handleSubmit}>
            submit
          </button>
        ) : (
          <button className="Submit-button-disabled page-disabled" onClick="">
            submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePage;

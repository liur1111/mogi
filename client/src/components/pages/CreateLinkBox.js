import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./CreateLinkBox.css";
import "./CreateTextBox.css";
import "../modules/Box.css";
import validator from "validator";

/**
 *
 * @param pageId
 * @param userId
 * @returns
 */
const CreateLinkBox = (props) => {
  const URL_DEFAULT_TEXT = "insert link here...";
  const DESC_DEFAULT_TEXT = "add a description to show on the box here...";
  const [linkBuffer, setLinkBuffer] = useState(""); // stores text for song url as the user is editing the box
  const [descriptionBuffer, setDescriptionBuffer] = useState(""); // stores text for description as the user is editing the box
  const [colorBuffer, setColorBuffer] = useState("#ffd632");

  function handleLinkChange(event) {
    setLinkBuffer(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescriptionBuffer(event.target.value);
  }

  function handleColorChange(event) {
    setColorBuffer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLinkBuffer(linkBuffer);
    post("/api/box", {
      creator_id: props.userId,
      page_id: props.pageId,
      box: {
        type: "link",
        description: descriptionBuffer.length > 0 ? descriptionBuffer : " ",
        content: linkBuffer,
        color: colorBuffer,
      },
    }).then(() => {
      location.href = "/page/" + props.pageId;
    });
  }

  useEffect(() => {}, [props.userId]);

  return (
    <div className="Linkbox-outline-container">
      what do you want to connect?
      <div className="Linkbox-info-container">
        <div className="Item link Linkbox-space">
          <div className="Item-content">link</div>
        </div>
        <input
          className="Linkbox-input"
          type="text"
          placeholder={URL_DEFAULT_TEXT}
          value={linkBuffer}
          onChange={handleLinkChange}
        ></input>
        <input
          className="Linkbox-input"
          type="text"
          placeholder={DESC_DEFAULT_TEXT}
          value={descriptionBuffer}
          onChange={handleDescriptionChange}
        ></input>
        <input type="color" value={colorBuffer} onChange={handleColorChange}></input>
        {validator.isURL(linkBuffer) ? (
          <button className="Submit-button link Submit-color-default" onClick={handleSubmit}>
            submit
          </button>
        ) : (
          <button className="Submit-button-disabled link-disabled Submit-color-default" onClick="">
            submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateLinkBox;

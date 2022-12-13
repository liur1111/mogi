import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./CreateTextBox.css";
import "../modules/Box.css";

/**
 *
 * @param pageId
 * @param userId
 * @returns
 */
const CreateTextBox = (props) => {
  const TEXTBOX_DEFAULT_TEXT = "Add text here...";
  const [textBuffer, setTextBuffer] = useState(""); // stores text as the user is editing the box
  const [colorBuffer, setColorBuffer] = useState("#ed6464");

  function handleChange(event) {
    setTextBuffer(event.target.value);
  }

  function handleColorChange(event) {
    setColorBuffer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTextBuffer(textBuffer);
    post("/api/box", {
      creator_id: props.userId,
      page_id: props.pageId,
      box: {
        type: "text",
        content: textBuffer,
        color: colorBuffer,
      },
    }).then(() => {
      location.href = "/page/" + props.pageId;
    });
  }

  useEffect(() => {}, [props.userId]);

  return (
    <div className="Textbox-outline-container">
      what do you want to say?
      <div className="Textbox-info-container">
        <div className="Item text">
          <div className="Item-content">text</div>
        </div>
        <textarea
          className="Textbox-input"
          placeholder={TEXTBOX_DEFAULT_TEXT}
          value={textBuffer}
          onChange={handleChange}
          name="text"
          wrap="soft"
          maxlength="480"
        ></textarea>
      </div>
      <input type="color" value={colorBuffer} onChange={handleColorChange}></input>
      {textBuffer.length > 0 ? (
        <button className="Submit-button text Submit-color-default" onClick={handleSubmit}>
          submit
        </button>
      ) : (
        <button className="Submit-button-disabled text-disabled Submit-color-default" onClick="">
          submit
        </button>
      )}
    </div>
  );
};

export default CreateTextBox;

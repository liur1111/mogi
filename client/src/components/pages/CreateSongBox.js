import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./CreateSongBox.css";
import "./CreateTextBox.css";
import "../modules/Box.css";
import { DEFAULT_SPOTIFY_PATH } from "../modules/Spotify";
/**
 *
 * @param pageId
 * @param userId
 * @returns
 */
const CreateSongBox = (props) => {
  const URL_DEFAULT_TEXT = "add Spotify link here...";
  const DESC_DEFAULT_TEXT = "add a song description to show on the box here...";
  const [songBuffer, setSongBuffer] = useState(""); // stores text for song url as the user is editing the box
  const [descriptionBuffer, setDescriptionBuffer] = useState(""); // stores text for description as the user is editing the box
  const [colorBuffer, setColorBuffer] = useState("#0dd983");

  function handleSongChange(event) {
    setSongBuffer(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescriptionBuffer(event.target.value);
  }

  function handleColorChange(event) {
    setColorBuffer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSongBuffer(songBuffer);
    post("/api/box", {
      creator_id: props.userId,
      page_id: props.pageId,
      box: {
        type: "song",
        description: descriptionBuffer,
        content: songBuffer,
        color: colorBuffer,
      },
    }).then(() => {
      location.href = "/page/" + props.pageId;
    });
  }

  useEffect(() => {}, [props.userId]);

  return (
    <div className="Songbox-outline-container">
      what do you want to play?
      <div className="Songbox-info-container">
        <div className="Item song Songbox-space">
          <div className="Item-content">song</div>
        </div>
        <input
          className="Songbox-input"
          type="text"
          placeholder={URL_DEFAULT_TEXT}
          value={songBuffer}
          onChange={handleSongChange}
        ></input>
        <input
          className="Songbox-input"
          type="text"
          placeholder={DESC_DEFAULT_TEXT}
          value={descriptionBuffer}
          onChange={handleDescriptionChange}
        ></input>
        <input type="color" value={colorBuffer} onChange={handleColorChange}></input>
        {songBuffer.slice(0, DEFAULT_SPOTIFY_PATH.length) === DEFAULT_SPOTIFY_PATH ? (
          <button className="Submit-button song Submit-color-default" onClick={handleSubmit}>
            submit
          </button>
        ) : (
          <button className="Submit-button-disabled song-disabled Submit-color-default" onClick="">
            submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateSongBox;

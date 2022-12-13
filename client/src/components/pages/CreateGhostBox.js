import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./CreateSongBox.css";
import "./CreateTextBox.css";
import "../modules/Box.css";

/**
 *
 * @param pageId
 * @param userId
 * @returns
 */
const CreateGhostBox = (props) => {
  const [colorBuffer, setColorBuffer] = useState("#525252");

  function handleColorChange(event) {
    setColorBuffer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    post("/api/box", {
      creator_id: props.userId,
      page_id: props.pageId,
      box: {
        type: "ghost",
        color: colorBuffer,
      },
    }).then(() => {
      location.href = "/page/" + props.pageId;
    });
  }

  useEffect(() => {}, [props.userId]);

  return (
    <div className="Songbox-outline-container">
      pretty but useless, like my ex-wife
      <div className="Songbox-info-container">
        <div className="Item ghost Songbox-space">
          <div className="Item-content">ghost</div>
        </div>
        <input type="color" value={colorBuffer} onChange={handleColorChange}></input>
        <button className="Submit-button ghost Submit-color-default" onClick={handleSubmit}>
          submit
        </button> 
      </div>
    </div>
  );
};

export default CreateGhostBox;

import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";
import CreateTextBox from "./CreateTextBox.js";
import "../../utilities.css";
import "./CreateBox.css";
import CreateSongBox from "./CreateSongBox";
import CreateLinkBox from "./CreateLinkBox";
import CreateGhostBox from "./CreateGhostBox";

/**
 *
 * @param type of box (optional)
 * @param pageId
 * @param userId
 * @returns
 */
const CreateBox = (props) => {
  const boxTypes = {
    text: <CreateTextBox pageId={props.pageId} userId={props.userId} />,
    song: <CreateSongBox pageId={props.pageId} userId={props.userId} />,
    link: <CreateLinkBox pageId={props.pageId} userId={props.userId} />,
    ghost: <CreateGhostBox pageId={props.pageId} userId={props.userId} />,
    image: <div>coming soon!</div>,
    code: <div>coming soon!</div>
  };

  return props.type !== "select" ? (
    boxTypes[props.type]
  ) : (
    <div className="Outline-container">
      select box type
      <div className="Outline-box-container">
        <div className="Item text">
          <Link className="Item-content" to={"/createbox/" + props.pageId + "/text"}>
            <div className="Item-content">text</div>
          </Link>
        </div>
        <div className="Item image">
          <Link className="Item-content" to={"/createbox/" + props.pageId + "/image"}>
            <div className="Item-content">image</div>
          </Link>
        </div>
        <div className="Item link">
          <Link className="Item-content" to={"/createbox/" + props.pageId + "/link"}>
            <div className="Item-content">link</div>
          </Link>
        </div>
        <div className="Item song">
          <Link className="Item-content" to={"/createbox/" + props.pageId + "/song"}>
            <div className="Item-content">song</div>
          </Link>
        </div>
        <div className="Item code">
          <Link className="Item-content" to={"/createbox/" + props.pageId + "/code"}>
            <div className="Item-content">code</div>
          </Link>
        </div>
        <div className="Item ghost">
          <Link className="Item-content" to={"/createbox/" + props.pageId + "/ghost"}>
            <div className="Item-content">ghost</div>
          </Link>
        </div>
        <div className="Page page">
          <Link className="Item-content" to={"/createpage/" + props.pageId}>
            <div className="Item-content pageTextColor">page</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateBox;

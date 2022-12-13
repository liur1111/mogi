import React, { useDebugValue } from "react";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import "./Box.css";

/**
 * Prototypes:
 *
 *@param {String} type of box
 @param {String} description of box (used for non-text boxes)
 *@param {String} content of box
 *@param {Number} color of box
 *@param defaultColor if on home page
 *
 * @returns Box of either type: text, image, link, song, page, ghost, code
 */
const Box = (props) => {
  const DEFAULT_BOX_COLOR = "#f0f0f0";

  return !props.defaultColor ? (
    props.type === "ghost" ? (
      <div className="Box" style={{ backgroundColor: props.color }}></div>
    ) : (
      <div className="Box" style={{ backgroundColor: props.color }}>
        <Link to={"/box/" + props.boxId}>
          <div className="content">
            {props.description ? <p>{props.description}</p> : <p>{props.content}</p>}
          </div>
        </Link>
      </div>
    )
  ) : props.type === "ghost" ? (
    <div className="Box" style={{ backgroundColor: DEFAULT_BOX_COLOR }}></div>
  ) : (
    <div className="Box" style={{ backgroundColor: DEFAULT_BOX_COLOR }}>
      <Link to={"/box/" + props.boxId}>
        <div className="content-default">
          {props.description ? <p>{props.description}</p> : <p>{props.content}</p>}
        </div>
      </Link>
    </div>
  );
};

export default Box;

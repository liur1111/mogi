import React from "react";
import { Link } from "@reach/router";
import "./Box.css";

/**
 * Prototypes:
 *
 *@param {Number} pageId of page
 *@param {String} pageName of page
 *
 * @returns Page
 */
const Page = (props) => {
  return (
    <div className="Box" style={{ backgroundColor: "#f0f0f0" }}>
      <Link to={"/page/" + props.pageId}>
        <div className="content-default">
          <p>{props.pageName}</p>
        </div>
      </Link>
    </div>
  );
};

export default Page;

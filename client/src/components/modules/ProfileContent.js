import React from "react";
import { useState, useEffect } from "react";
import Page from "./Page.js";
import { get } from "../../utilities";
import "../../utilities.css";
import "./PageContent.css";

/**
 *
 * @param userId
 * @returns the pages of the user in their profile
 */
const ProfileContent = (props) => {
  const [pages, setPages] = useState([{}]);

  useEffect(() => {
    get("/api/userPages", { userId: props.userId }).then((pages) => {
      setPages(pages);
    });
  }, [props.userId]);

  let pagesList = [];
  if (pages.length > 0) {
    pagesList = pages.map((page) => <Page pageId={page._id} pageName={page.name} />);
  } else {
    pagesList = <div>no pages to show!</div>;
  }

  return pages ? (
    pagesList.length > 0 ? (
      <div className="PageContent-container">{pagesList}</div>
    ) : (
      <div className="NoBoxes"> this user has no pages yet!</div>
    )
  ) : (
    <></>
  );
};

export default ProfileContent;

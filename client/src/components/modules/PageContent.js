import React from "react";
import { useState, useEffect } from "react";
import Box from "./Box.js";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./PageContent.css";
import Page from "./Page.js";

/**
 *
 * @param pageId
 * @returns the boxes of a page
 */
const PageContent = (props) => {
  const [pageBoxes, setPageBoxes] = useState([{}]);
  const [pages, setPages] = useState([{}]);
  useEffect(() => {
    get("/api/pageBoxes", { master: props.pageId }).then((boxes) => {
      setPageBoxes(boxes);
    });
    get("/api/pagePages", { master: props.pageId }).then((pages) => {
      setPages(pages);
    });
  }, [props.pageId]);

  let boxesList = [];
  let pagesList = [];
  if (pageBoxes.length > 0) {
    boxesList = pageBoxes.map((box) => (
      <Box
        boxId={box._id}
        content={box.content}
        description={box.description ?? undefined}
        type={box.type}
        color={box.color}
      />
    ));
  }
  if (pages.length > 0) {
    pagesList = pages.map((page) => <Page pageId={page._id} pageName={page.name} />);
  }
  if (pageBoxes.length == 0 && pages.length == 0) {
    <div>no boxes to show!</div>;
  }

  let allBoxesList = pagesList.concat(boxesList);

  return pageBoxes || pages ? (
    allBoxesList.length > 0 ? (
      <div className="PageContent-container">{allBoxesList}</div>
    ) : (
      <div className="NoBoxes">this page has no boxes yet!</div>
    )
  ) : (
    <></>
  );
};

export default PageContent;

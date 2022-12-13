import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Page from "../modules/Page";
import PageInfo from "../modules/PageInfo.js";
import PageContent from "../modules/PageContent.js";
import "../../utilities.css";

/**
 *
 * @param pageId
 * @param userId
 * @returns the page profile
 */
const OpenPage = (props) => {
  const [page, setPage] = useState({});

  useEffect(() => {
    document.title = "Profile Page";
  }, [props.pageId]);

  useEffect(() => {
    get("/api/page", { page_id: props.pageId }).then((page) => {
      setPage(page);
    });
  }, [props.userId]);

  return page ? (
    <>
      <PageInfo pageId={props.pageId} userId={props.userId} />
      <div className="u-seperate-page"></div>
      <PageContent pageId={props.pageId} />
    </>
  ) : (
    <></>
  );
};

export default OpenPage;

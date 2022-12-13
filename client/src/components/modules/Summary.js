import React from "react";
import { Link } from "@reach/router";
import { useState, useEffect } from "react";
import "./Summary.css";
import "../../utilities.css";
import Box from "./Box";
import { get } from "../../utilities";
import Page from "./Page.js";
import { User } from "./User.js";
import "./PageContent.css";

const Summary = () => {
  const [boxes, setBoxes] = useState([{}]);
  const [pages, setPages] = useState([{}]);
  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    get("/api/allBoxes").then((boxes) => {
      setBoxes(boxes);
    });
    get("/api/allPages").then((pages) => {
      setPages(pages);
    });
    get("/api/allUsers").then((users) => {
      setUsers(users);
    });
  }, []);

  const createRows = () => {
    const boxRows = boxes.map((box) => (
      <Box
        className="Box"
        content={box.content}
        boxId={box._id}
        type={box.type}
        color={box.color}
        defaultColor={true}
        description={box.description ?? undefined}
      />
    ));

    const pageRows = pages.map((page) => <Page pageId={page._id} pageName={page.name} />);
    const userRows = users.map((user) => <User userId={user._id} userName={user.username} />);

    return [boxRows, pageRows, userRows];
  };

  const rows = createRows();

  return (
    <>
      <div className="Summary-container">
        <div className="Summary-row-container">
          <Link className="Summary-banner" to="/explore">
            check out hot boxes
          </Link>
          <div className="Summary-box-container">{rows[0]}</div>
        </div>
        <div className="Summary-row-container">
          <Link className="Summary-banner" to="/explore">
            check out hot pages
          </Link>
          <div className="Summary-box-container">{rows[1]}</div>
        </div>
        <div className="Summary-row-container">
          <Link className="Summary-banner" to="/explore">
            check out hot users
          </Link>
          <div className="Summary-box-container">{rows[2]}</div>
        </div>
      </div>
    </>
  );
};

export default Summary;

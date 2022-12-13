import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";

import "./OpenBox.css";
import { Spotify } from "../modules/Spotify.js";

const OpenBox = (props) => {
  const [box, setBox] = useState(undefined);
  const [creatorName, setCreatorName] = useState(undefined);
  const [master, setMaster] = useState(undefined);
  const [opened, setOpened] = useState(false);

  function openLink() {
    if (!opened) {
      window.open(box.content, "_blank");
      setOpened(true);
    }
  }

  useEffect(() => {
    get("/api/box", { box_id: props.boxId }).then((box) => {
      setBox(box);
      get("/api/boxCreator", { creator_id: box.creator_id }).then((user) => {
        setCreatorName(user.username);
      });
      get("/api/boxMaster", { master: box.master }).then((page) => {
        setMaster(page.name);
      });
    });
  }, [props.boxId]);

  // pseudo switch statement. more info at: https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals
  var boxTypes = {
    text: (box) => {
      return box.content;
    },
    image: "coming soon",
    link: (box) => {
      openLink();
      return box.content;
    },
    song: (box) => {
      return <Spotify songLink={box.content} />;
    },
    code: "coming soon",
    ghost: "boo",
  };

  return box ? (
    <div className="OpenBox-container">
      <div className="OpenBox OpenBox-content" style={{ backgroundColor: box.color }}>
        {boxTypes[box.type](box)}
      </div>
      <div className="InfoBox">
        <div className="InfoBox-info">
          <Link to={"/profile/" + box.creator_id}>{`created by: ${creatorName}`}</Link>
        </div>
        <div className="InfoBox-info">
          <Link to={"/page/" + box.master}>{`inside page: ${master}`}</Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default OpenBox;

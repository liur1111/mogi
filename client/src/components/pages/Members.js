import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import { User } from "../modules/User.js";
import "../../utilities.css";
import "../modules/Menu.css";
import "../modules/FollowingSummary.css";

/**
 *
 * @param pageId
 * @param userId
 * @returns
 */
const Members = (props) => {
  const [allCreators, setAllCreators] = useState([]);

  useEffect(() => {
    get("/api/page", { page_id: props.pageId }).then((page) => {
      get("/api/pageCreators", { creator_ids: JSON.stringify(page.creator_ids) }).then(
        (creators) => {
          setAllCreators(creators);
        }
      );
    });
  }, []);

  console.log(allCreators);

  let creatorsList = [];
  if (allCreators) {
    creatorsList = allCreators.map((user) => <User userId={user._id} userName={user.username} />);
  }

  return allCreators ? (
    creatorsList.length > 0 ? (
      <div className="FollowingList">{creatorsList}</div>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default Members;

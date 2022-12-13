import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { User } from "./User.js";
import "../../utilities.css";
import "./Menu.css";
import "./FollowingSummary.css";

/**
 *
 * @param userId
 * @returns
 */
const FollowSummary = (props) => {
  const [following, setFollowing] = useState(undefined);

  useEffect(() => {
    get("/api/user", { userId: props.userId }).then((user) => {
      get("/api/following", { usersFollowing: JSON.stringify(user.usersFollowed) }).then(
        (people) => {
          setFollowing(people);
        }
      );
    });
  }, []);

  let followingList = [];
  if (following) {
    followingList = following.map((user) => <User userId={user._id} userName={user.username} />);
  }

  return following ? (
    followingList.length > 0 ? (
      <div className="Following-container">
        <div className="FollowingTitle">Users you follow: </div>
        <div className="FollowingList">{followingList}</div>
      </div>
    ) : (
      <div>go follow somebody</div>
    )
  ) : (
    <></>
  );
};

export default FollowSummary;

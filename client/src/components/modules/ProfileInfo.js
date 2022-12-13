import React from "react";
import { Link } from "@reach/router";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./PageInfo.css";
import "./BigBox.css";
import "./Box.css";
import "../../utilities.css";

/**
 *
 * @param profileId
 * @param userId
 * @returns the user info in their profile
 */
const ProfileInfo = (props) => {
  // default text for certain scenarios
  const FAULT_NO_USER_BIO = "no user bio exists";
  const BIO_ENTRY_DEFAULT_TEXT = "enter bio here";

  // all states used in PageInfo section
  const [profileObj, setProfileObj] = useState(null); // stores the object of the user who's profile is being displayed
  const [showBioEntry, setShowBioEntry] = useState(false); // true or false for showing text entry box for editing bio
  const [bioValue, setBioValue] = useState(""); // the bio displayed on the user's profile
  const [bioBuffer, setBioBuffer] = useState(""); // stores text as the user is editing their bio
  const [myProfile, setMyProfile] = useState(false); // true if is user's profile, else false
  const [isFollowed, setIsFollowed] = useState(false);

  // called whenever the user types in the new post input box
  function handleChange(event) {
    setBioBuffer(event.target.value);
  }

  // called when the user hits submit for their bio
  function handleSubmit(event) {
    event.preventDefault();
    setBioValue(bioBuffer); // set the current bio to whatever is in the bioBuffer
    setShowBioEntry(false);
    post("/api/userBio", { bio: bioBuffer, userId: props.profileId });
  }

  function followUser(event) {
    event.preventDefault();
    setIsFollowed(true);
    post("/api/followUser", { follower: props.userId, followee: props.profileId });
  }

  useEffect(() => {
    get("/api/user", { userId: props.profileId }).then((profile) => {
      setProfileObj(profile);
      setBioValue(profile.userBio);
      setBioBuffer(bioValue);
    });
    get("/api/isFollowing", { userId: props.userId, profileId: props.profileId }).then((bool) => {
      setIsFollowed(bool);
    });
    if (props.profileId === props.userId) {
      setMyProfile(true);
    }
  }, [props.profileId]);

  if (profileObj) {
    // profileObj is undefined during the time that it takes to send a get request to the server and
    //set the userObj state, dont return the page until that happens
    return (
      <div className="PageInfo-container">
        <div className="PageInfo-stats-container">
          <div className="PageInfo-name">{profileObj.username}</div>
          <div className="PageInfo-bio-container">
            {myProfile ? (
              /* if showBioEntry is true, then the user sees the text entry */
              showBioEntry ? (
                <>
                  <input
                    className="PageInfo-bio-info"
                    type="text"
                    placeholder={BIO_ENTRY_DEFAULT_TEXT}
                    value={bioBuffer}
                    onChange={handleChange}
                  ></input>
                  <button onClick={handleSubmit}>submit</button>
                </>
              ) : (
                <div className="PageInfo-bio-info">{bioValue ?? FAULT_NO_USER_BIO}</div>
              )
            ) : (
              <div className="PageInfo-bio-info">{bioValue ?? FAULT_NO_USER_BIO}</div>
            )}
          </div>
        </div>

        {myProfile ? (
          <div className="PageOption-container">
            <div
              className="PageOption"
              onClick={() => {
                setShowBioEntry(true);
                setBioBuffer(bioValue);
              }}
            >
              edit
            </div>
            <div className="PageOption">
              <Link to={"/createpage/" + undefined}>add page</Link>
            </div>
          </div>
        ) : (
          <>
            {isFollowed ? (
              <div className="PageOption">following</div>
            ) : (
              <div className="PageOption FollowButton" onClick={followUser}>
                follow
              </div>
            )}
          </>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default ProfileInfo;

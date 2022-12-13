import React, { useState, useEffect } from "react";
import ProfileInfo from "../modules/ProfileInfo.js";
import ProfileContent from "../modules/ProfileContent.js";
import GoogleLogin from "react-google-login";
import "./Profile.css";

/**
 *
 * @param profileId
 * @param userId
 * @param handleLogin
 * @param clientID
 * @returns the profile page of a user
 */
const Profile = (props) => {
  useEffect(() => {
    document.title = "Profile Page";
  }, [props.profileId]);

  return props.userId ? (
    <>
      <ProfileInfo profileId={props.profileId} userId={props.userId} />
      <div className="u-seperate-page"></div>
      <ProfileContent userId={props.profileId} />
    </>
  ) : (
    <div>
      access denied... please
      <GoogleLogin
        clientId={props.clientID}
        buttonText="Login"
        onSuccess={props.handleLogin}
        onFailure={(err) => console.log(err)}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} className="Button-invisible">
            sign in
          </button>
        )}
      />
    </div>
  );
};

export default Profile;

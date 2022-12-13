import React from "react";

/**
 * @param {string} songLink the url link to a spotify song when you click on "share" and then "copy song link" in Spotify
 */
const Radio = (props) => {
  const optionsArray = props.options.map((option) => (
    <>
      <input type="radio" value={option} /> {option}
    </>
  ));
  return <dev onChange={props.handleChange}>{optionsArray}</dev>;
};

export default Radio;

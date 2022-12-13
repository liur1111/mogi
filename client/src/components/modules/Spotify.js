import React from "react";

const DEFAULT_SPOTIFY_PATH = "https://open.spotify.com/track/";

/**
 * @param {string} songLink the url link to a spotify song when you click on "share" and then "copy song link" in Spotify
 */
const Spotify = (props) => {
  const trackInfo = props.songLink.slice(DEFAULT_SPOTIFY_PATH.length); // get all info after "/track/" so we can paste it into the embed
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackInfo}`}
      width="600"
      height="600"
      frameBorder=""
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      style={{ borderRadius: "8px" }}
    ></iframe>
  );
};

export { Spotify, DEFAULT_SPOTIFY_PATH };

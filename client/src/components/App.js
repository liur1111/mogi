import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Explore from "./pages/Explore.js";
import Profile from "./pages/Profile.js";
import Following from "./pages/Following.js";
import Saved from "./pages/Saved.js";
import Notifications from "./pages/Notifications.js";
import Settings from "./pages/Settings.js";
import OpenBox from "./pages/OpenBox.js";
import OpenPage from "./pages/OpenPage.js";
import CreatePage from "./pages/CreatePage.js";
import CreateBox from "./pages/CreateBox.js";
import AddUser from "./pages/AddUser.js";
import NotFound from "./pages/NotFound.js";
import Members from "./pages/Members.js";

import "../utilities.css";
import "./modules/Viewport.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

const GOOGLE_CLIENT_ID = "332339292011-860rukipukkelo9c9poo69ggel896ko9.apps.googleusercontent.com";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, [userId]);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar userId={userId} />
      <Router className="Viewport">
        <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} clientID={GOOGLE_CLIENT_ID}/>
        <Explore path="/explore/" />
        <Profile path="/profile/:profileId/" userId={userId} handleLogin={handleLogin} clientID={GOOGLE_CLIENT_ID}/>
        <Following path="/following/" userId={userId} handleLogin={handleLogin} clientID={GOOGLE_CLIENT_ID}/>
        <Saved path="/saved/" />
        <Notifications path="/notifications/" />
        <Settings path="/settings/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} clientID={GOOGLE_CLIENT_ID} />
        <OpenBox path="/box/:boxId/" />
        <OpenPage path="/page/:pageId/" userId={userId}/>
        <CreatePage path="/createpage/:pageId" userId={userId}/>
        <CreateBox path="/createbox/:pageId/:type" userId={userId} />
        <AddUser path="adduser/:pageId/:newUser" userId={userId} />
        <Members path="members/:pageId" userId={userId}/>

        <NotFound default />
      </Router>
    </>
  );
};

export default App;

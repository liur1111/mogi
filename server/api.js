/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Box = require("./models/box");
const Page = require("./models/page");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { db } = require("./models/user");
const box = require("./models/box");
const mongoose = require("mongoose");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// ------------------------- GETS -----------------------------
router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

router.get("/page", (req, res) => {
  const page_id = req.query.page_id;
  Page.findById(page_id).then((page) => {
    res.send(page);
  });
});

router.get("/box", (req, res) => {
  const box_id = req.query.box_id;
  Box.findById(box_id).then((box) => {
    res.send(box);
  });
});

router.get("/pageBoxes", async (req, res) => {
  const master = req.query.master;
  const allBoxes = await Box.find({ master: master });
  res.send(allBoxes);
});

router.get("/allBoxes", async (req, res) => {
  const boxes = await Box.find().where('type').ne('ghost').sort({_id: -1}).limit(5);
  res.send(boxes);
});


router.get("/boxCreator", (req, res) => {
  const userId = req.query.creator_id;
  User.findById(userId).then((user) => res.send(user));
});

router.get("/boxMaster", (req, res) => {
  const pageId = req.query.master;
  Page.findById(pageId).then((page) => res.send(page));
});

router.get("/allPages", async (req, res) => {
  const pages = await Page.find().sort({_id: -1}).limit(5);
  res.send(pages);
});

router.get("/allUsers", async (req, res) => {
  const users = await User.find().sort({_id: -1}).limit(5);
  res.send(users);
});

router.get("/userPages", async (req, res) => {
  const creator_id = req.query.userId;
  const userPages = await Page.find({ creator_ids: creator_id })
    .where("master")
    .equals("undefined");
  res.send(userPages);
});

router.get("/pagePages", async (req, res) => {
  const master = req.query.master;
  const pagePages = await Page.find({ master: master });
  res.send(pagePages);
});

router.get("/pageCreators", async (req, res) => {
  const creator_ids = JSON.parse(req.query.creator_ids);
  const pageCreators = await User.find().where('_id').in(creator_ids);
  res.send(pageCreators);
});

router.get("/userByUserName", async (req, res) => {
  const username = req.query.username;
  const users = await User.find({username: username});
  res.send(users);
});

router.get("/isFollowing", (req, res) => {
  const userId = req.query.userId;
  const profileId = [req.query.profileId];
  User.findById(userId).then((user) => {
    if (user.usersFollowed.includes(profileId)) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

router.get("/following", async (req, res) => {
  const usersFollowing = JSON.parse(req.query.usersFollowing);
  const users = await User.find().where('_id').in(usersFollowing);
  res.send(users);
})

// router.get("/allTextBoxes", async (req, res) => {
//   const boxes = await Box.find({type:'song'});
//   console.log(boxes);
//   res.send(boxes);
// });


// ---------------------- POSTS -------------------------
router.post("/box", (req, res) => {
  const out = {};
  const body = req.body;
  const newBox = new Box({
    creator_id: body.creator_id,
    master: body.page_id,
    type: body.box.type,
    content: body.box.content,
    description: body.box.description,
    color: body.box.color,
  });
  newBox.save().then((box) => (out.box = box));

  if (newBox.master) {
    Page.findById(newBox.master).then((page) => {
      page.content.push(newBox._id);
      page.save().then((page) => {
        out.page = page;
      });
    });
  }
  res.send(out);
});

router.post("/page", (req, res) => {
  const out = {};
  const body = req.body;
  const creator_id = body.creator_id;
  const newPage = new Page({
    creator_ids: creator_id,
    isGroup: body.page.isGroup,
    content: body.page.content,
    pageBio: body.page.bio,
    master: body.page.master,
    name: body.page.name,
  });
  newPage.save();

  User.findById(creator_id).then((user) => {
    user.pages.push(newPage._id);
    user.save().then((user) => {
      out.user = user;
      res.send(out);
    });
  });
});

router.post("/userBio", (req, res) => {
  const body = req.body;
  const userBio = body.bio;
  const userId = body.userId;

  User.findById(userId).then((user) => {
    user.userBio = userBio;
    user.save().then((user) => res.send(user));
  });
});

router.post("/pageBio", (req, res) => {
  const body = req.body;
  const pageBio = body.bio;
  const pageId = body.pageId;

  Page.findById(pageId).then((page) => {
    page.pageBio = pageBio;
    page.save().then((page) => res.send(page));
  });
});

/**
 * Add another user to page
 */
router.post("/addUser", (req, res) => {
  const out = {}
  const body = req.body;
  const pageId = body.pageId;
  const newUser = body.newUser;

  Page.findById(pageId).then((page) => {
    page.creator_ids.push(newUser);
    page.save().then((page) => out.page = page);
  });

  User.findById(newUser).then((user) => {
    user.pages.push(pageId);
    user.save().then((user) => out.user = user);
  });

  res.send(out);
});

router.post("/changeUserName", async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const newUserName = body.username;

  const existUserName = await User.findOne({ username: newUserName });
  if (existUserName) {
    res.send(false);
  } else {
    User.findById(userId).then((user) => {
      user.username = newUserName;
      user.save();
      res.send(true);
    });
  }
});

router.post("/followUser", (req, res) => {
  const body = req.body;
  const follower = body.follower;
  const followee = body.followee;

  User.findById(follower).then((user) => {
    user.usersFollowed.push(followee);
    user.save().then(() => res.send(user));
  });
});

// router.post("/changeBox", (req, res) => {
//   const body = req.body;
//   const boxId = body.boxId;
//   Box.findById(boxId).then((box) => {
//     box.color = "#e9e9e9";
//     box.save().then(() => res.send(box));
//   });
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

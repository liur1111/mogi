const { query } = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  googleid: String,
  pages: Array,
  userBio: String,
  savedBoxes: Array, // of string id's of boxes
  usersFollowed: Array, // of user.ids (mongo generated id's)
  // profilePicture: String,
  // color: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);

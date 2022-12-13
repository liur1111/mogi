const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  creator_ids: Array, // of user._ids (mongo generated)
  isGroup: Boolean, // True if group
  content: Array, // of box ids (Strings, id's mongo generated)
  pageBio: String,
  master: String,
  name: String,
  // profilePicture: String,
  // color: Number,
  // views: Number,
});

// compile model from schema
module.exports = mongoose.model("page", PageSchema);
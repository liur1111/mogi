const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
  creator_id: Array, // array of user_ids owning the box
  master: String, // page._id if box is part of page, else NULL
  type: String, // text, image, link, song, code, ghost, page
  description: String, // shows up on box instead of link (if applicable)
  content: String,
  color: String,
  // views: Number,
});

// compile model from schema
module.exports = mongoose.model("box", BoxSchema);

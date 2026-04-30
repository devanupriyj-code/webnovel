const mongoose = require("mongoose");

const NovelSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImage: String
});

module.exports = mongoose.model("Novel", NovelSchema);
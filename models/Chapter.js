const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  novelId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  chapterNumber: Number
});

module.exports = mongoose.model("Chapter", ChapterSchema);
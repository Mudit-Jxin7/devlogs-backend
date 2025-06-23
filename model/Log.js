const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: String,
  items: [String],
  language: String,
});

const logSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  entries: [entrySchema],
});

logSchema.index({ id: 1 }, { unique: true }); // Ensure uniqueness for upserts

module.exports = mongoose.model("Log", logSchema);

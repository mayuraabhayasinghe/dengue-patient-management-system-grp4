const mongoose = require("mongoose");

const attentionNeededSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AttentionNeeded", attentionNeededSchema);

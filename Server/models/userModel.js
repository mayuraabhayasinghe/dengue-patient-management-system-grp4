const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: ture },
  password: { type: String, required: ture },
  role: String,
});

module.exports = mongoose.model("User", userSchema);

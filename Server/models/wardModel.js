const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["General", "Pediatric", "Intensive Care"],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Under Maintenance"],
    default: "Active",
  },
});

module.exports = mongoose.model("Ward", wardSchema);

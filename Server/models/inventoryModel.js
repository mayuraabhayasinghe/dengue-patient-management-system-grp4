const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    threshold: { type: Number, required: true },
    unit: { type: String, required: true },
    lastRestocked: { type: Date, required: true },
    supplier: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);

const Inventory = require("../models/inventoryModel");

const addInventoryItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addInventoryItem };


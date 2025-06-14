const Inventory = require("../models/inventoryModel");

// CREATE: Add a new inventory item
const addInventoryItem = async (req, res) => {
   console.log("Received POST request at /api/inventory", req.body);
  try {
    const newItem = new Inventory(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ: Get all inventory items
// inventoryController.js
const getInventoryItems = async (req, res) => {
  console.log("GET /api/inventory called");
  try {
    const items = await Inventory.find();
    console.log(`Inventory items fetched: ${items.length}`);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE: Update an inventory item by ID
const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE: Delete an inventory item by ID
const deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addInventoryItem,
  getInventoryItems,
  updateInventoryItem,
  deleteInventoryItem
};



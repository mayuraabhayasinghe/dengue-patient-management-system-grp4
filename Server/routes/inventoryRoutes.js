const express = require("express");
const router = express.Router();
const {
  addInventoryItem,
  getInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryController");

// Remove the redundant "/inventory" prefix
router.post("/", addInventoryItem);
router.get("/", getInventoryItems);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

module.exports = router;

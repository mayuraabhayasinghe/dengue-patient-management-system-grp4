const express = require("express");
const router = express.Router();
const { addInventoryItem } = require("../controllers/inventoryController");

router.post("/", addInventoryItem);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createWard,
  getWards,
  updateWard,
  deleteWard,
} = require("../controllers/wardController");

// POST - Create
router.post("/", createWard);

// GET - All Wards
router.get("/", getWards);

// PUT - Update by ID
router.put("/:id", updateWard);

// DELETE - Delete by ID
router.delete("/:id", deleteWard);

module.exports = router;



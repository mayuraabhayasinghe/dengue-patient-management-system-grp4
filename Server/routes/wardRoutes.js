const express = require("express");
const router = express.Router();
const {
  addWard,
  getWards,
  getWardById,
  updateWard,
  deleteWard,
} = require("../controllers/wardController");

router.post("/", addWard);
router.get("/", getWards);
router.get("/:id", getWardById);
router.put("/:id", updateWard);
router.delete("/:id", deleteWard);

module.exports = router;


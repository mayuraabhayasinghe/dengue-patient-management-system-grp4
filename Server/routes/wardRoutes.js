const express = require("express");
const router = express.Router();
const { createWard, getWards } = require("../controllers/wardController");

router.post("/", createWard);   // POST /api/wards
router.get("/", getWards);      // GET /api/wards

module.exports = router;

const express = require("express");
const router = express.Router();
const { submitFluidData } = require("../controllers/fluidController");

router.post("/submit", submitFluidData);

module.exports = router;




const express = require("express");
const router = express.Router();
const { addVitals } = require("../controllers/patientVitalsController");

router.post("/add", addVitals);
// router.get("/all", getAllVitals);

module.exports = router;

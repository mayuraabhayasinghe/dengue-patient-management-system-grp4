const express = require("express");
const router = express.Router();
const { loginUser, getAllUsers } = require("../controllers/authController");

// POST: Login user
router.post("/login", loginUser);

// GET: Fetch all users
router.get("/getuser", getAllUsers);


module.exports = router;

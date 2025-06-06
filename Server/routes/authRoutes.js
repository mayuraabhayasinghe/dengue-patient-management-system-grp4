const express = require("express");
const router = express.Router();
const { loginUser, getAllUsers, getUserById } = require("../controllers/authController");

// POST: Login user
router.post("/login", loginUser);

// GET: Fetch all users
router.get("/getuser", getAllUsers);

// GET: Fetch users bu Id

router.get("/:id", getUserById);


module.exports = router;

const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
    res.send("Admin access granted");
});

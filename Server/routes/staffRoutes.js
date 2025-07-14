const express = require('express');
const router = express.Router();
const { addStaff, getAllStaff, getStaffById, updateStaff, deleteStaff } = require('../controllers/staffController');


router.post('/add', addStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

module.exports = router;
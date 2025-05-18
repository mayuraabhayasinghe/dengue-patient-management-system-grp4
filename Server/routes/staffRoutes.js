const express = require('express');
const router = express.Router();
const { addStaff } = require('../controllers/staffController');


router.post('/register-staff', addStaff);

module.exports = router;
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/auth');


router.post('/register', staffController.registerStaff);


router.get('/', authMiddleware, staffController.getAllStaff);

module.exports = router;
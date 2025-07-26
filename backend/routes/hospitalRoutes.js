const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/register', hospitalController.register);
router.post('/send-login-link', hospitalController.sendLoginLink);

module.exports = router;

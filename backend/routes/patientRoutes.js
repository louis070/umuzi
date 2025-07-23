const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');

router.post('/register', patientController.register);
router.post('/login', patientController.login);
router.post('/logout', patientController.logout);
router.get('/profile', auth, patientController.getProfile);

module.exports = router;
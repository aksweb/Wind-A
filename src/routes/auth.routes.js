const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/register', validateRegistration, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

module.exports = router;
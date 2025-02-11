const express = require('express');
const { addTrain, getSeatAvailability } = require('../controllers/trainController');
const isAdmin = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/trains', isAdmin, addTrain);
router.get('/trains/availability', getSeatAvailability);

module.exports = router;
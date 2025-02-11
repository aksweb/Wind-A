const express = require('express');
const { bookSeat, getUserBookings } = require('../controllers/bookingController');
const authenticate = require('../middleware/authenticate'); // Middleware to verify JWT token

const router = express.Router();

router.post('/bookings', authenticate, bookSeat);
router.get('/bookings', authenticate, getUserBookings);

module.exports = router;
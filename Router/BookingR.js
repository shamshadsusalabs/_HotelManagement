const express = require('express');
const router = express.Router();
const bookingController = require('../Controller/BookingC');
const  authenticateToken  = require('../Middileware/User.auth');

// Create a new booking
router.post('/bookings', authenticateToken, bookingController.createBooking);

// Get all bookings
router.get('/bookings', authenticateToken, bookingController.getAllBookings);

// Get a single booking by ID
router.get('/bookings/:id', authenticateToken, bookingController.getBookingById);

// Update a booking by ID
router.put('/bookings/:id', authenticateToken, bookingController.updateBooking);

// Delete a booking by ID
router.delete('/bookings/:id', authenticateToken, bookingController.deleteBooking);

router.patch('/bookings/:id', authenticateToken, bookingController.updateBooking);

module.exports = router;

const express = require('express');
const router = express.Router();
const checkInController = require('../Controller/CheckInC');
const  authenticateToken  = require('../Middileware/User.auth');
// Create a new check-in
router.post('/checkins',   authenticateToken,checkInController.createCheckIn);

// Get all check-ins
router.get('/checkins',  authenticateToken, checkInController.getAllCheckIns);

// Get a single check-in by ID
router.get('/checkins/:id',   authenticateToken,checkInController.getCheckInById);

// Update a check-in by ID
router.put('/checkins/:id',  authenticateToken, checkInController.updateCheckIn);

// Delete a check-in by ID
router.delete('/checkins/:id',  authenticateToken, checkInController.deleteCheckIn);

module.exports = router;
